import { FIND_GAME, CANCEL_FIND_GAME, START_GAME, ANSWER_GAME } from '../actions/gameActions';

export default function(state = {}, action){
    console.log('[GAME_REDUCER]', action);
    switch(action.type){
        case CANCEL_FIND_GAME:
        case FIND_GAME:
        case "GAME_WILL_START":
        case "SEND_QUESTION":

            const store = {
                chosenAnswer: false,
                correctAnswer: null
            };

            return { ...state, ...action.data, ...store };
        case "START_GAME":
        case ANSWER_GAME:
        case "ANSWER_RESULT":
            return { ...state, ...action.data };
        default:
            return state;
    }
}