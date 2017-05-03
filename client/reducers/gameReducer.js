import {FIND_GAME, CANCEL_FIND_GAME, START_GAME, ANSWER_GAME} from '../actions/gameActions';

export default function (state = {}, action) {
    console.log('[GAME_REDUCER]', action);
    let store;

    switch (action.type) {
        case CANCEL_FIND_GAME:
        case FIND_GAME:
        case "GAME_WILL_START":
        case "SEND_QUESTION":

            store = {
                chosenAnswer: false,
                correctAnswer: null
            };

            return {...state, ...action.data, ...store};
        case "START_GAME":
        case ANSWER_GAME:
        case "ANSWER_RESULT":
            return {...state, ...action.data};
        case "GAME_RESULT":
            //Обнуляем игру
            store = {
                status: null,
                gameWillStart: false,       //Игра начнется через несколько секунд
                iSgame: false,              //Идет ли игра
                gameId: 0,                  //Ид игры
                users: [],                  //Игроки в комнате
                totalQuestion: 0,           //Всего вопросов
                questionNumber: 1,          //Номер вопроса
                question: '',
                chosenAnswer: 0,            //Выбранный ответ
                correctAnswer: false,       //Верный ответ
                answers: [],                //Ответы
                points: 0,                  //Очков в текущей игре
                showGameResult: true,
                gameResut: action.data
            };

            return {...state, ...store};
        default:
            return state;
    }
}