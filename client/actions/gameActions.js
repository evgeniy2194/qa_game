export const CANCEL_FIND_GAME = 'CANCEL_FIND_GAME';
export const START_GAME = 'START_GAME';
export const ANSWER_GAME = 'ANSWER_GAME';
export const USE_HINT = 'USE_HINT';
export const LEAVE_GAME = 'LEAVE_GAME';
export const GET_QUEST_REWARD = 'GET_QUEST_REWARD';

import {FIND_GAME} from "../constants/game";

export function onFindGameClick() {
    return {
        type: FIND_GAME,
        data: {status: FIND_GAME},
        socket: {
            action: FIND_GAME
        }
    }
}

export function onCancelFindGameClick() {
    return {
        type: CANCEL_FIND_GAME,
        data: {status: null},
        socket: {
            action: CANCEL_FIND_GAME
        }
    }
}

export function onLeaveGameClick() {
    return {
        type: LEAVE_GAME,
        data: {status: null},
        socket: {
            action: LEAVE_GAME
        }
    }
}

export function onAnswerQuestionClick(gameId, answerId) {
    return {
        type: ANSWER_GAME,
        data: {chosenAnswer: answerId},
        socket: {
            action: ANSWER_GAME,
            data: {
                gameId: gameId,
                answerId: answerId
            }
        }
    }
}

export function onHintClick(data) {
    return {
        type: USE_HINT,
        data: {},
        socket: {
            action: USE_HINT,
            data: {
                gameId: data.gameId,
                questionId: data.questionId,
                hint: data.hint,
                userId: data.userId
            }
        }
    }
}

export function getQuestReward(userQuestId) {
    return {
        type: GET_QUEST_REWARD,
        data: {},
        socket: {
            action: GET_QUEST_REWARD,
            data: {
                userQuestId: userQuestId
            }
        }
    }
}