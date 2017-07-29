import Game from './game';
import User from './user';
import Question from './question';
import QuestionAnswer from './questionAnswer';
import GameAnswer from './gameAnswer';

Question.hasMany(QuestionAnswer, {as: 'answers'});
QuestionAnswer.belongsTo(Question, {as: 'question'});

Game.belongsToMany(User, {through: 'GameUsers', as: 'users'});
Game.belongsToMany(Question, {through: 'GameQuestions', as: 'questions'});

Game.belongsToMany(QuestionAnswer, {
    through: GameAnswer,
    foreignKey: 'gameId',
    otherKey: 'answerId',
    as: 'answers'
});

export {Game, User, Question, QuestionAnswer};