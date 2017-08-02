import Game from './game';
import User from './user';
import Question from './question';
import QuestionAnswer from './questionAnswer';
import GameAnswer from './gameAnswer';
import Quest from './quest';
import UserQuest from './userQuest';
import Hints from './hints';
import HintsUsing from './hintsUsing';
import GemsAndCoinsUsing from './gemsAndCoinsUsing'
import HintCosts from './hintCosts';


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

Quest.belongsToMany(User, {through: UserQuest, as: 'users'});
User.belongsToMany(Quest, {through: UserQuest, as: 'quests'});
UserQuest.belongsTo(Quest, {as: 'quest'});
UserQuest.belongsTo(User, {as: 'user'});

Hints.hasMany(HintCosts, {as: 'costs'});


export {Game, User, Question, QuestionAnswer, Quest, UserQuest, Hints, HintCosts, GemsAndCoinsUsing};

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
 (4, "Черное", true);

 INSERT INTO Quests (`requirements`, `description`, `check`, `rewardCount`, `rewardType`)
 VALUES
 (5, "Сыграть 5 игр", "SELECT count(*) as progress FROM GameUsers WHERE userId = :userId", 1, "gems"),
 (1, "Ответить верно на 1 вопрос", "SELECT count(*) as progress FROM GameAnswers WHERE userId = :userId AND isCorrect = true", 2, "gems");

 insert into Hints (name) values ('hint50'), ('VeryExpensive');

 insert into HintCosts (hintId, countOfUse, coins, gems) values
 (1, 0, 100, 0),
 (1, 1, 200, 2),
 (1, 2, 300, 4),
 (1, 3, 400, 8),
 (2, 0, 100, 100),
 (2, 1, 200, 200),
 (2, 2, 300, 400),
 (2, 3, 400, 800);

 */