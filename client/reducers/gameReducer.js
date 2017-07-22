import {CANCEL_FIND_GAME, START_GAME, ANSWER_GAME, LEAVE_GAME} from '../actions/gameActions';
import {SHOW_GAME_RESULT} from '../constants/game';
import {FIND_GAME} from "../constants/game";

export default function (state = {}, action) {
    let store;

    switch (action.type) {
        case CANCEL_FIND_GAME:
        case FIND_GAME:
        case LEAVE_GAME:
        case "GAME_WILL_START":
        case "SEND_QUESTION":
            store = {
                chosenAnswer: false,
                isCorrectAnswer: null
            };

            return {...state, ...action.data, ...store};
        case ANSWER_GAME:
        case "START_GAME":
        case "ANSWER_RESULT":
            return {...state, ...action.data};
        case "WRONG_ANSWERS":
            store = {answers : []};
            store.answers = state.answers.map(answer => {

                if(action.data.wrongAnswers.indexOf(answer.id) === -1){
                    answer.isWrong = false;
                }else{
                    answer.isWrong = true;
                }
                return answer;
            });
            store.is50HintUsed = true;
            return {...state, ...store};
        case "GAME_RESULT":
            //Обнуляем игру
            store = {
                status: SHOW_GAME_RESULT,
                gameId: 0,                  //Ид игры
                users: [],                  //Игроки в комнате
                totalQuestion: 0,           //Всего вопросов
                questionNumber: 1,          //Номер вопроса
                question: '',
                chosenAnswer: 0,            //Выбранный ответ
                isCorrectAnswer: false,       //Верный ответ
                answers: [],                //Ответы
                wrongAnswers: [],
                points: 0,                  //Очков в текущей игре
                showGameResult: true,
                gameResut: action.data,
                is50HintUsed: false
            };

            return {...state, ...store};
        default:
            return state;
    }
}