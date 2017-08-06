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
                        onAnswerQuestionClick={this.props.onAnswerQuestionClick}
                        onHintClick={this.props.onHintClick}
                        onLeaveGameClick={this.props.onLeaveGameClick}
                        game={this.props.game}
                        user={this.props.user}/>
                );
                break;
            default:
                gameTpl = <button className="btn btn-orange" onClick={ onFindGameClick }>Играть</button>;
                break;
        }

        return <div className="game-area">{gameTpl}</div>;
    }
}