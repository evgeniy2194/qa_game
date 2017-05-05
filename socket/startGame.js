import shuffle from 'shuffle-array';
import Question from '../app/models/question';
import Game from '../app/models/game';
import GamesStore from '../store/gamesStore';
import QueueStore from '../store/queueStore';
import UsersStore from '../store/usersStore';
import config from '../config/config';
import sendMessage from './sendMessage';
import {sendUserInfo} from '../actions/userActions';
import {startGame, sendQuestion, gameResult} from '../actions/gameActions';

export default function () {

    const totalQuestion = config.game.totalQuestion;    //Колл-во вопросов в игре
    const playersCount = config.game.playersCount;      //Колл-во игроков в игре
    const roundTime = config.game.roundTime;            //Время одного раунда

    let questionNumber = 0;     //Номер вопроса

    try {
        //Ищем вопросы в базе
        Question.find().limit(totalQuestion).exec((err, questions) => {
            if (err) throw err;

            //Перемешиваем вопросы
            questions = shuffle(questions);

            //Забираем с очереди 2 игрока для игры
            let players = QueueStore.cut(playersCount);
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
            }, (err, game) => {
                if (err) throw err;

                //Добавляем игру в список игр
                let currentGame = {
                    game: game,
                    currentQuestion: '',
                    questions: questions,
                    players: players,
                    usersAnswers: usersAnswers
                };

                //Добавляем игру в список активных
                GamesStore.add(game._id, currentGame);

                //Игра началась
                sendMessage(players, startGame(game._id, game.users));

                //Отправляем новые вопросы по таймауту
                let interval = setDeceleratingTimeout(() => {

                    //Если вопросов нет - конец игры
                    if (questionNumber === questions.length) {
                        clearInterval(interval);
                        console.log(interval);

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
                            user.exp += exp;
                            user.gems += gems;

                            user.save(function (err) {
                                if (err) throw err;

                                //Обновляем юзера
                                players.forEach(player =>{
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

                        //Отправляем игроку новый вопрос
                        var questionToSend = {
                            questionNumber: questionNumber, //Номер вопроса
                            totalQuestion: questions.length,   //Всего вопросов
                            question: question.question,    //Вопрос
                            answers: question.answers,      //Ответы
                        };
                        sendMessage(players, sendQuestion(questionToSend));
                    }

                }, roundTime, questions.length+1 );
            });
        });
    } catch (err) {
        console.trace(err);
    }
}

function setDeceleratingTimeout(callback, factor, times){

    var internalCallback = function(tick, counter) {
        return function() {
            if (--tick >= 0) {

                setTimeout(internalCallback, factor);
                callback();
            }
        }
    }(times, 0);

    setTimeout(internalCallback, 0);
};