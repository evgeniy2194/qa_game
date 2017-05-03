import React, {Component} from 'react';

import SearchPlayersComponent from './game/searchPlayers';
import WaitingGameStartComponent from './game/waitingGameStart';
import IsGameComponent from './game/isGame';
import {GAME_WILL_START, SEARCH_PLAYERS, IS_GAME} from "../constants/game";


export default class Game extends Component {

    /**
     * User answered on question
     */
    answer(gameId, answerId) {
        this.props.answerGame(gameId, answerId);
    }

    getAnswerButtonColor(answerId) {
        /**
         * Выбранный ответ
         * @type {number}
         */
        const chosenAnswer = this.props.game.chosenAnswer;

        /**
         * Верный ли ответ
         * @type {boolean}
         */
        const correctAnswer = this.props.game.correctAnswer;

        let className = 'btn ';

        if (chosenAnswer == answerId) {
            className += correctAnswer ? 'btn-green' : 'btn-red';
        } else {
            className += 'btn-orange';
        }

        return className;
    }

    render() {

        const game = this.props.game;
        const findGame = this.props.findGame;

        let gameTpl;

        switch (game.status) {
            case GAME_WILL_START:
                gameTpl = <WaitingGameStartComponent/>;
                break;
            case SEARCH_PLAYERS:
                gameTpl = <SearchPlayersComponent cancelSearchPlayers={this.props.cancelFindGame}/>;
                break;
            case IS_GAME:
                gameTpl = <IsGameComponent game={this.props.game}/>;
                break;
            default:
                gameTpl = <button style={{'margin-top':'150px'}} className="btn btn-orange" onClick={ findGame }>Играть</button>;
                break;
        }

        return gameTpl;
    }
}

// if (game.showGameResult) {
//
//     const result = game.gameResut;
//     const keys = Object.keys(result);
//
//     keys.sort().reverse();
//
//     keys.forEach(key => {
//         const users = result[key];
//
//         users.forEach(user => {
//             tpl += key + ' ' + user.firstName + ' ' + user.lastName + ' coins: ' + user.coins + ' exp: ' + user.exp + ' gems: ' + user.gems;
//         });
//     });
//
//     tpl = ( <div><span>Результаты игры:</span><br/>{ tpl } </div>);
// }