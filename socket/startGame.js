import shuffle from 'shuffle-array';
import Question from '../app/models/question';
import Game from '../app/models/game';
import GamesStore from '../store/gamesStore';
import QueueStore from '../store/queueStore';
import UsersStore from '../store/usersStore';
import sendMessage from './sendMessage';
import { sendUserInfo } from '../actions/userActions';
import { startGame, sendQuestion, gameResult } from '../actions/gameActions';

export default function(){

    const totalQuestion = 4;    //Всего вопросов
    const playersCount = 1;
    let questionNumber = 0;     //Номер вопроса

    //Ищем вопросы в базе
    Question.find().limit(totalQuestion).exec((err, questions) => {

        //Перемешиваем вопросы
        questions = shuffle(questions);

        //Забираем с очереди 2 игрока для игры
        let players = QueueStore.cut(playersCount);

        let playerModels = [];
        let usersAnswers = {};

        players.forEach((player) => {
            let userId = player.userId;
            playerModels.push(UsersStore.get(userId));
            usersAnswers[userId] = {
                correctAnswers: 0,
                points: 0,
                answers: {}
            }
        });

        //Сохраняем игру в базу
        Game.create({
            users: playerModels,
            questions: questions,
        }, (err, game) => {

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

            //Каждые 3 секунды отправляем новый вопрос
            let interval = setInterval(() => {

                //Если вопросов нет - конец игры
                if(questionNumber === 4){
                    clearInterval(interval);

                    //Считаем очки игроков
                    let gamePoints = {};

                    console.log("usersAnswers:", currentGame.usersAnswers);

                    //Отправляем результаты игры каждому игроку отдельно
                    players.forEach((player) => {

                        const coins = 5;
                        const exp = 10;

                        //Обновляем игроков
                        let user = UsersStore.get(player.userId);

                        user.exp += exp;
                        user.coins += coins;

                        user.save(function (err) {

                            //Обновляем юзера
                            sendMessage(player, sendUserInfo(user));
                        });

                        //Закрываем игру

                        //Удаляем игру из списка игр
                        GamesStore.remove(game._id);
                    });

                } else {

                    let question = questions[questionNumber];
                    questionNumber++;

                    //Записываем вопрос в текущую игру
                    currentGame.currentQuestion = question;

                    //Отправляем игроку новый вопрос
                    sendMessage(players, sendQuestion({
                            questionNumber: questionNumber, //Номер вопроса
                            totalQuestion: totalQuestion,   //Всего вопросов
                            question: question.question,    //Вопрос
                            answers: question.answers,      //Ответы
                        })
                    );
                }
            }, 3000);
        });
    });
}