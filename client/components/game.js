import React, {Component} from 'react';

import FindGameComponent from './game/findGameComponent';
import WaitingGameStartComponent from './game/waitingGameStart';
import ShowGameResultComponent from './game/showGameResult';
import IsGameComponent from './game/isGame';
import {GAME_WILL_START, FIND_GAME, IS_GAME, SHOW_GAME_RESULT} from "../constants/game";


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
                        game={this.props.game}/>
                );
                break;
            case SHOW_GAME_RESULT:
                gameTpl = (
                    <div>
                        <ShowGameResultComponent result={game.gameResut}/>
                        <button className="btn btn-orange" onClick={ onFindGameClick }>Играть еще</button>
                    </div>
                );
                break;
            default:
                gameTpl = <button className="btn btn-orange" onClick={ onFindGameClick }>Играть</button>;
                break;
        }

        return <div className="game-area">{gameTpl}</div>;
    }
}