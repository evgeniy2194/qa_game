import Game from './game';
import User from './user';
import Question from './question';
import QuestionAnswer from './QuestionAnswer';

Question.hasMany(QuestionAnswer, {as: 'answers'});
QuestionAnswer.belongsTo(Question, {as: 'question'});

Game.belongsToMany(User, {through: 'GameUsers', as: 'users'});
Game.belongsToMany(Question, {through: 'GameQuestions', as: 'questions'});

export {Game, User, Question, QuestionAnswer};