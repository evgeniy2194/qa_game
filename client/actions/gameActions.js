export const RESET_GAME         = 'RESET_GAME';
export const FIND_GAME          = 'FIND_GAME';
export const CANCEL_FIND_GAME   = 'CANCEL_FIND_GAME';
export const START_GAME         = 'START_GAME';
export const ANSWER_GAME        = 'ANSWER_GAME';

import {SEARCH_PLAYERS} from "../constants/game";

export function resetGame(){
    return {
        type: RESET_GAME,
    }
}

export function findGame(){
    return {
        type: FIND_GAME,
        data: { status: SEARCH_PLAYERS },
        socket: {
            action: FIND_GAME
        }
    }
}

export function cancelFindGame(){
    return {
        type: CANCEL_FIND_GAME,
        data: { status: null },
        socket: {
            action: CANCEL_FIND_GAME
        }
    }
}

export function answerGame(gameId, answerId){
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