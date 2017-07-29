import Game from './game';
import User from './user';
import Question from './question';
import QuestionAnswer from './questionAnswer';
import GameAnswer from './gameAnswer';
import Quest from './quest';
import UserQuest from './userQuest';

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

Game.belongsToMany(QuestionAnswer, {
    through: GameAnswer,
    foreignKey: 'gameId',
    otherKey: 'answerId',
    as: 'answers'
});

UserQuest.belongsTo(Quest, {as: 'quest'});
UserQuest.belongsTo(User, {as: 'user'});

export {Game, User, Question, QuestionAnswer};

/**
 INSERT into Questions (question) VALUES
 ("Сколько раз старик из сказки А. С. Пушкина вызывал Золотую рыбку?"),
 ("Сколько килобайт в 1 мегабайте?"),
 ("Сколько пар хромосом распределяется на одного (здорового) человека?"),
 ("В какое море впадает река Днестр?");

 INSERT into QuestionAnswers (questionId, answer, isCorrect) VALUES
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

 INSERT INTO quests (`requirements`, `check`, `rewardCount`, `rewardType`)
 VALUES
 (5, "SELECT count(*) FROM GameUsers WHERE userId = :userId", 1, "gems"),
 (1, "SELECT count(*) FROM GameAnswers WHERE userId = :userId AND isCorrect = true", 2, "gems")

*/