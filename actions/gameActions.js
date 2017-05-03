export function startGame(gameId, users){
    return {
        type: "START_GAME",
        data: {
            gameWillStart: false,
            iSgame: true,
            gameId: gameId,
            users: users
        }
    }
}

export function sendQuestion(data){
    return {
        type: "SEND_QUESTION",
        data: {
            questionNumber: data.questionNumber,
            totalQuestion: data.totalQuestion,
            question: data.question,
            answers: data.answers,
        }
    };
}

export function answerResult(answerId, isCorrectAnswer){
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

// export function gameResult(data) {
//     return {
//         type: "GAME_RESULT",
//         data: {
//             standings: data.standings,
//
//         }
//     }
// }