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
}, {
    timestamps: false
});

Question.hasMany(QuestionAnswers, {as: 'answers'});

export default Question;

/**
 INSERT into questions (question) VALUES
 ("Сколько раз старик из сказки А. С. Пушкина вызывал Золотую рыбку?"),
 ("Сколько килобайт в 1 мегабайте?"),
 ("Сколько пар хромосом распределяется на одного (здорового) человека?"),
 ("В какое море впадает река Днестр?");

 INSERT into question_answers (questionId, answer, isCorrect) VALUES
 (1, "3", false),
 (1, "4", false),
 (1, "5", true),
 (1, "6", false),
 (2, "1000", false),
 (2, "16", false),
 (2, "512", false),
 (2, "1024", true),
 (3, "23", true),
 (3, "24", false),
 (3, "11", false),
 (3, "12", false),
 (4, "Мертвое", false),
 (4, "Красное", false),
 (4, "Синее", false),
 (4, "Черное", true)
*/