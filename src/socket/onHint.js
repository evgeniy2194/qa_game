import sendMessage from './sendMessage';
import {GamesStore, UsersStore} from '../utils/store';
import {sendWrongAnswers, sendHintsCost} from '../actions/gameActions';
import {sendUserInfo} from "../actions/userActions";
import {decreaseCoins, decreaseGems} from '../utils/userUtils';
import {HINT_50, VERY_EXPENSIVE} from '../constants/hints';
import shuffle from 'shuffle-array';
import {CalculateHints} from "../utils/HintsCalculator";

export default (socket, data) => {
    const gameId = data.gameId;
    const userId = socket.userId;
    const user = UsersStore.get(userId);
    const game = GamesStore.get(gameId);
    const question = game.currentQuestion;
    const answers = shuffle(question.answers);

    let noHintsLeft = false;
    let alreadyUsed = false;
    let hintsCost = {};
    let newHintsCost = {};
    let hintName = data.hint;


    game.users = game.users.map(user => {

        if (user.userId === userId) {

            if (!user.hints.roundHintsUsed[hintName]) {
                user.hints.roundHintsUsed[hintName] = true;
                hintsCost = CalculateHints(user);

                if (!hintsCost[hintName]) {
                    noHintsLeft = true; // means that there are no hints left for the user
                } else {
                    // reduce coins/gems

                    decreaseCoins(user.model, hintsCost[hintName].coins);
                    decreaseGems(user.model, hintsCost[hintName].gems);


                    user.model.save();
                    sendMessage(socket, sendUserInfo(user.model));
                    user.hints.hintsUsedCounter[hintName]++;
                }
            } else {
                alreadyUsed = true;
            }
            newHintsCost = CalculateHints(user);
        }

        return user;
    });
    if (newHintsCost[data.hint]) {
        sendMessage(socket, sendHintsCost(newHintsCost));
    } else {
        sendMessage(socket, sendHintsCost({'NoMoreHintsLeft': true}));
    }

    switch (data.hint) {
        case HINT_50:

            let wrongAnswers = [];
            let count = 0;

            if (!alreadyUsed) {
                answers.forEach(answer => {
                    if (question.correctAnswerId !== answer.id && count < 2) {
                        count++;
                        wrongAnswers.push(answer.id);
                    }
                });
            }

            if (newHintsCost[HINT_50]) {
                sendMessage(socket, sendHintsCost(newHintsCost));
            } else {
                sendMessage(socket, sendHintsCost({'NoMoreHintsLeft': true}));
            }

            if (!noHintsLeft) {
                sendMessage(socket, sendWrongAnswers({wrongAnswers: wrongAnswers}));
            }

            break;
        case VERY_EXPENSIVE:
        default:
            break;
    }
}