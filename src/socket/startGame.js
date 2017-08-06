import moment from 'moment';
import Game from '../database/models/game';
import {GamesStore, UsersStore, QuestionsStore, HintsStore} from '../utils/store';
import sendMessage from './sendMessage';
import {sendUserInfo, sendLevelUp} from '../actions/userActions';
import {startGame, sendQuestion, gameResult, sendHintsCost} from '../actions/gameActions';
import {getExpToLevel, getLevelByExp} from '../utils/userUtils';
import {refreshQuests} from '../utils/userUtils';

export default function (users, gameConfig) {

    const totalQuestion = gameConfig.totalQuestion;    //Колл-во вопросов в игре
    const roundTime = gameConfig.roundTime;            //Время одного раунда

    //Ищем totalQuestion рандомных вопросы
    let questions = QuestionsStore.getRandom(totalQuestion);
    let questionNumber = 0;     //Номер вопроса
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


    //Сохраняем игру в базу
    Game.create().then(gameModel => {
        const gameId = gameModel.id;

        users.forEach((user) => {
            user.gameId = gameId;
            usersAnswers.set(user.id, {
                correctAnswers: 0,
                points: 0,
                answers: new Map
            });
        });


        let currentGame = {
            id: gameId,
            model: gameModel,
            users: users,
            currentQuestion: '',
            questions: questions,
            usersAnswers: usersAnswers
        };


        currentGame.users = currentGame.users.map(user => {
            user.hints.hintsUsedCounter = {};
            Object.keys(HintsStore.getAll()).map(hintName => {
                user.hints.hintsUsedCounter[hintName] = 0;
            });
            return user;
        });

        //Добавляем игру в список активных
        GamesStore.add(gameId, currentGame);

        //Сохраняем инфу о вопросах и игроках
        let userModels = users.map((user => {
            return user.model;
        }));
        gameModel.setUsers(userModels);
        gameModel.setQuestions(questions);

        //Изначальная стоимость подсказок
        sendMessage(users, sendHintsCost(hintsCost));

        //Игра началась
        sendMessage(users, startGame(gameId, userModels));

        //Отправляем новые вопросы по таймауту
        let interval = setDeceleratingTimeout(() => {
            let users = currentGame.users;

            // //Заканчиваем игру если все игроки вышли
            // if (users.length === 0) {
            //     GamesStore.remove(gameId);
            //     clearInterval(interval);
            //
            //     //Игра закончилась
            //     gameModel.finishedAt = moment().format('YYYY-MM-DD HH:mm:ss');
            //     gameModel.save();
            //     return;
            // }

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
                    let userModel = user.model;
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
                        firstName: userModel.firstName,
                        lastName: userModel.lastName,
                        userId: userId
                    });

                    userModel.coins += coins;
                    userModel.expTotal += exp;
                    userModel.gems += gems;

                    const oldUserLevel = userModel.level;
                    const userLevel = getLevelByExp(userModel.expTotal);

                    userModel.level = userLevel;
                    userModel.expToLevel = getExpToLevel(userLevel + 1);

                    userModel.save().then(() => {
                        users.forEach(player => {
                            if (player.id === userId) {
                                //Обновляем юзера
                                sendMessage(user, sendUserInfo(userModel));
                                //Пересчитываем квесты
                                refreshQuests(user);
                            }
                        });

                        console.log('oldUserLevel:', oldUserLevel);
                        console.log('userLevel', userLevel);
                        //Поздравляем пользователя с повышением уровня
                        if (oldUserLevel !== userLevel) {
                            sendMessage(user, sendLevelUp(userLevel));
                        }
                    });

                    //Удаляем игру из списка игр
                    GamesStore.remove(gameId);

                    //Игра закончилась
                    gameModel.finishedAt = moment().format('YYYY-MM-DD HH:mm:ss');
                    gameModel.save();
                });

                //Отправляем всем ирокам результаты игры
                sendMessage(users, gameResult(gameRewards));

            } else {
                let question = questions[questionNumber];
                let endTime = moment.utc().add('seconds', roundTime / 1000);

                questionNumber++;

                //Записываем вопрос в текущую игру
                currentGame.currentQuestion = question;
                currentGame.currentQuestion.endTime = endTime;
                currentGame.currentQuestion.totalQuestion = questions.length;
                currentGame.currentQuestion.questionNumber = questionNumber;

                currentGame.users = currentGame.users.map(user => {

                    console.log(HintsStore.getAll());
                    Object.keys(HintsStore.getAll()).map(hintName => {

                        user.hints.roundHintsUsed = user.roundHintsUsed || {};
                        user.hints.roundHintsUsed[hintName] = false;
                    });
                    return user;
                });
                sendMessage(users, sendQuestion(currentGame.currentQuestion));
            }

        }, roundTime, questions.length + 1);
    });
}

function setDeceleratingTimeout(callback, factor, times) {

    let internalCallback = function (tick) {
        return function () {
            if (--tick >= 0) {
                setTimeout(internalCallback, factor);
                callback();
            }
        }
    }(times, 0);

    setTimeout(internalCallback, 0);
}