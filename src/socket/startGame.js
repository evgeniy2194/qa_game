import Question from '../models/question';
import Game from '../models/game';
import {GamesStore, UsersStore} from '../utils/store';
import sendMessage from './sendMessage';
import {sendUserInfo} from '../actions/userActions';
import {startGame, sendQuestion, gameResult} from '../actions/gameActions';
import {getExpToLevel, getLevelByExp} from "../utils/levelCalculation";

export default function (players, gameConfig) {

    const totalQuestion = gameConfig.totalQuestion;    //Колл-во вопросов в игре
    const roundTime = gameConfig.roundTime;            //Время одного раунда

    let questionNumber = 0;     //Номер вопроса

    try {
        //Ищем в базе totalQuestion рандомных вопросы
        //Math.floor( Math.random() * count )

        Question.aggregate([{$sample: {size: totalQuestion}}]).then(questions => {
            let playerModels = [];
            let usersAnswers = new Map;

            players.forEach((player) => {
                playerModels.push(UsersStore.get(player.userId));
                usersAnswers.set(player.userId, {
                    correctAnswers: 0,
                    points: 0,
                    answers: new Map
                });
            });

            //Сохраняем игру в базу
            Game.create({
                users: playerModels,
                questions: questions,
            }).then(game => {

                //Добавляем игру в список игр
                let currentGame = {
                    game: game,
                    currentQuestion: '',
                    questions: questions,
                    players: players,
                    usersAnswers: usersAnswers
                };

                playerModels.forEach(player => {
                    player.currentGameId = game._id;
                    player.save();
                });

                //Добавляем игру в список активных
                GamesStore.add(game._id, currentGame);

                //Игра началась
                sendMessage(players, startGame(game._id, game.users));

                //Отправляем новые вопросы по таймауту
                let interval = setDeceleratingTimeout(() => {
                    players = currentGame.players;

                    if (players.length == 0) {
                        GamesStore.remove(game._id);
                        clearInterval(interval);
                        return;
                    }
                    //Если вопросов нет - конец игры
                    if (questionNumber === questions.length) {
                        clearInterval(interval);

                        const usersAnswers = currentGame.usersAnswers;

                        //Создаем обьект результатов игры
                        //Отправляем каждому игроку его очки
                        //Считаем очки игроков
                        let gamePoints = [];
                        for (let answer of usersAnswers.values()) {
                            let points = answer.points;
                            if (gamePoints.indexOf(points) === -1) {
                                gamePoints.push(answer.points);
                            }
                        }

                        gamePoints.sort().reverse();

                        //Насчитываем награды игрокам
                        let gameRewards = {};

                        usersAnswers.forEach((answer, userId) => {
                            let user = UsersStore.get(userId);
                            let correctAnswers = answer.correctAnswers;
                            let points = answer.points;

                            gameRewards[points] = gameRewards[points] || [];

                            const place = gamePoints.indexOf(points);

                            let coef = 6 - parseInt(place);

                            const coins = 5 * coef;
                            const exp = 10 * correctAnswers * coef;
                            const gems = coef > 3 ? coef - 3 : 0;

                            gameRewards[points].push({
                                coins: coins,
                                exp: exp,
                                gems: gems,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                userId: userId
                            });

                            user.coins += coins;
                            user.totalExp += exp;
                            user.gems += gems;

                            const userLevel = getLevelByExp(user.totalExp);

                            user.level = userLevel;
                            user.expToNextLevel = getExpToLevel(userLevel + 1);

                            user.save().then(() => {
                                //Обновляем юзера
                                players.forEach(player => {
                                    if (player.userId === userId) {
                                        sendMessage(player, sendUserInfo(user));
                                    }
                                });
                            });

                            //Удаляем игру из списка игр
                            GamesStore.remove(game._id);
                        });

                        //Отправляем всем ирокам результаты игры
                        sendMessage(players, gameResult(gameRewards));
                    } else {

                        const question = questions[questionNumber];
                        questionNumber++;
                        //Записываем вопрос в текущую игру
                        currentGame.currentQuestion = question;
                        currentGame.currentQuestion['questionNumber'] = questionNumber;
                        //Отправляем игроку новый вопрос
                        let questionToSend = {
                            questionNumber: questionNumber, //Номер вопроса
                            totalQuestion: questions.length,   //Всего вопросов
                            question: question.question,    //Вопрос
                            answers: question.answers,      //Ответы
                        };
                        sendMessage(players, sendQuestion(questionToSend));
                    }

                }, roundTime, questions.length + 1);
            });
        }).catch(error => {
            throw error;
        });
    } catch (err) {
        console.trace(err);
    }
}

function setDeceleratingTimeout(callback, factor, times) {

    let internalCallback = function (tick, counter) {
        return function () {
            if (--tick >= 0) {

                setTimeout(internalCallback, factor);
                callback();
            }
        }
    }(times, 0);

    setTimeout(internalCallback, 0);
}