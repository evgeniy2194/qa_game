export const RESET_GAME         = 'RESET_GAME';
export const CANCEL_FIND_GAME   = 'CANCEL_FIND_GAME';
export const START_GAME         = 'START_GAME';
export const ANSWER_GAME        = 'ANSWER_GAME';

import {FIND_GAME} from "../constants/game";

export function resetGame(){
    return {
        type: RESET_GAME,
    }
}

export function onFindGameClick(){
    return {
        type: FIND_GAME,
        data: { status: FIND_GAME },
        socket: {
            action: FIND_GAME
        }
    }
}

export function onCancelFindGameClick(){
    return {
        type: CANCEL_FIND_GAME,
        data: { status: null },
        socket: {
            action: CANCEL_FIND_GAME
        }
    }
}

export function onAnswerGameClick(gameId, answerId){
    return {
        type: ANSWER_GAME,
        data: { chosenAnswer: answerId },
        socket: {
            action: ANSWER_GAME,
            data: {
                gameId: gameId,
                answerId: answerId
            }
        }
    }
}