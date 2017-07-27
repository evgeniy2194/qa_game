export function startGame(gameId, users) {
    return {
        type: "START_GAME",
        data: {
            status: 'IS_GAME',
            gameId: gameId,
            users: users
        }
    }
}

export function sendQuestion(data) {
    return {
        type: "SEND_QUESTION",
        data: {
            questionNumber: data.questionNumber,
            totalQuestion: data.totalQuestion,
            question: data.question,
            answers: data.answers,
            endTime: data.endTime
        }
    };
}

export function sendHintsCost(data) {
    return {
        type: "HINTS_COST",
        data: data
    }
}

export function answerResult(answerId, isCorrectAnswer) {
    return {
        type: "ANSWER_RESULT",
        data: {
            chosenAnswer: answerId,
            isCorrectAnswer: isCorrectAnswer
        }
    }
}

export function gameResult(data) {
    return {
        type: "GAME_RESULT",
        data: data
    }
}

export function sendWrongAnswers(data) {
    return {
        type: "WRONG_ANSWERS",
        data: data
    }
}