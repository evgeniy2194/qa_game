import Sequelize from 'sequelize';
import connect from '../connect';
import QuestionAnswers from './questionAnswer';

const Question = connect.define('question', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    question: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

Question.hasMany(QuestionAnswers, {as: 'answers'});

export default Question;

// Question.create({
//     question: "Сколько раз старик из сказки А. С. Пушкина вызывал Золотую рыбку?",
//     answers: [
//         { id: 1, answer: "3", isWrong: false },
//         { id: 2, answer: "4", isWrong: false },
//         { id: 3, answer: "5", isWrong: false },
//         { id: 4, answer: "6", isWrong: false }
//     ],
//     correctAnswerId: 3,
// });
//
// Question.create({
//     question: "Сколько килобайт в 1 мегабайте?",
//     answers: [
//         { id: 1, answer: "1000", isWrong: false},
//         { id: 2, answer: "16", isWrong: false},
//         { id: 3, answer: "512", isWrong: false},
//         { id: 4, answer: "1024", isWrong: false}
//     ],
//     correctAnswerId: 4,
// });
//
// Question.create({
//     question: "Сколько пар хромосом распределяется на одного (здорового) человека?",
//     answers: [
//         { id: 1, answer: "23", isWrong: false },
//         { id: 2, answer: "24", isWrong: false },
//         { id: 3, answer: "11", isWrong: false },
//         { id: 4, answer: "12", isWrong: false }
//     ],
//     correctAnswerId: 1,
// });
//
// Question.create({
//     question: "В какое море впадает река Днестр?",
//     answers: [
//         { id: 1, answer: "Мертвое", isWrong: false },
//         { id: 2, answer: "Красное", isWrong: false },
//         { id: 3, answer: "Синее", isWrong: false },
//         { id: 4, answer: "Черное", isWrong: false }
//     ],
//     correctAnswerId: 4,
// });