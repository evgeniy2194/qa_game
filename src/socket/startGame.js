import moment from 'moment';
import Game from '../database/models/game';
import {GamesStore, UsersStore, QuestionsStore, HintsStore} from '../utils/store';
import sendMessage from './sendMessage';
import {sendUserInfo} from '../actions/userActions';
import {startGame, sendQuestion, gameResult, sendHintsCost} from '../actions/gameActions';
import {getExpToLevel, getLevelByExp} from "../utils/levelCalculation";
import connect from '../database/connect';

export default function (players, gameConfig) {

    const totalQuestion = gameConfig.totalQuestion;    //Колл-во вопросов в игре
    const roundTime = gameConfig.roundTime;            //Время одного раунда

    //Ищем totalQuestion рандомных вопросы
    let questions = QuestionsStore.getRandom(totalQuestion);
    let questionNumber = 0;     //Номер вопроса
    let playerModels = [];
    let usersAnswers = new Map;
    let hints = HintsStore.getAll();
    let hintsCost = {};

    for (let hintName in hints) {
        hintsCost[hintName] = HintsStore.getCostByNameAndCount(hintName, 0);
    }

    questions.forEach(question => {
        question.answers.forEach(answer => {
            if (answer.isCorrect) {
                question.correctAnswerId = answer.id;
            }
        })
    });

    players.forEach((player) => {
        playerModels.push(UsersStore.get(player.userId));
        usersAnswers.set(player.userId, {
            correctAnswers: 0,
            points: 0,
            answers: new Map
        });
    });

    //Сохраняем игру в базу
    Game.create().then(game => {

        // game.users = game.users.map(user =>{
        //
        //     Object.keys(HintsStore.getAll()).map(hintName =>{
        //         user.hintsUsedCounter[hintName] = 0;
        //     });
        //     return user;
        // });

        let currentGame = {
            game: game,
            currentQuestion: '',
            questions: questions,
            players: players,
            usersAnswers: usersAnswers
        };

        //Добавляем игру в список активных
        GamesStore.add(game.id, currentGame);

        //Сохраняем инфу о вопросах и игроках
        game.setUsers(playerModels);
        game.setQuestions(questions);

        //Изначальная стоимость подсказок
        sendMessage(players, sendHintsCost(hintsCost));

        //Игра началась
        sendMessage(players, startGame(game.id, game.users));

        //Отправляем новые вопросы по таймауту
        let interval = setDeceleratingTimeout(() => {
            players = currentGame.players;

            if (players.length === 0) {
                GamesStore.remove(game.id);
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
                    user.expTotal += exp;
                    user.gems += gems;

                    const userLevel = getLevelByExp(user.expTotal);

                    user.level = userLevel;
                    user.expToLevel = getExpToLevel(userLevel + 1);

                    user.save().then(() => {
                        //Обновляем юзера
                        players.forEach(player => {
                            if (player.userId === userId) {
                                sendMessage(player, sendUserInfo(user));
                            }
                        });
                    });

                    //Удаляем игру из списка игр
                    GamesStore.remove(game.id);

                    //Игра закончилась
                    game.finishedAt = moment().format('YYYY-MM-DD HH:mm:ss');
                    game.save();
                });

                //Отправляем всем ирокам результаты игры
                sendMessage(players, gameResult(gameRewards));

            } else {
                let question = questions[questionNumber];
                let endTime = moment.utc().add('seconds', roundTime / 1000);

                questionNumber++;

                //Записываем вопрос в текущую игру
                currentGame.currentQuestion = question;
                currentGame.currentQuestion.endTime = endTime;
                currentGame.currentQuestion.totalQuestion = questions.length;
                currentGame.currentQuestion.questionNumber = questionNumber;

                currentGame.players = currentGame.players.map(user => {

                    Object.keys(HintsStore.getAll()).map(hintName => {
                        user.roundHintsUsed = user.roundHintsUsed || {};
                        user.roundHintsUsed[hintName] = false;
                    });
                    return user;
                });
                sendMessage(players, sendQuestion(currentGame.currentQuestion));
            }

        }, roundTime, questions.length + 1);
    });
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