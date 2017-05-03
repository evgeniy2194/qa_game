import React, {Component} from 'react';

import FindGameComponent from './game/findGameComponent';
import WaitingGameStartComponent from './game/waitingGameStart';
import IsGameComponent from './game/isGame';
import {GAME_WILL_START, FIND_GAME, IS_GAME} from "../constants/game";


export default class Game extends Component {

    render() {

        const game = this.props.game;
        const onFindGameClick = this.props.onFindGameClick;

        let gameTpl;
        console.log(game.status);
        switch (game.status) {
            case GAME_WILL_START:
                gameTpl = <WaitingGameStartComponent/>;
                break;
            case FIND_GAME:
                gameTpl = <FindGameComponent cancelSearchPlayers={this.props.onCancelFindGameClick}/>;
                break;
            case IS_GAME:
                gameTpl = (
                    <IsGameComponent
                        onAnswerClick={this.props.onAnswerClick}
                        game={this.props.game}/>
                );
                break;
            default:
                gameTpl = (
                    <button style={{'margin-top':'150px'}}
                            className="btn btn-orange"
                            onClick={ onFindGameClick }>
                        Играть
                    </button>
                );
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