import React, {Component} from 'react';
import VK from '../libs/vk';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {
    onFindGameClick,
    onCancelFindGameClick,
    onAnswerQuestionClick,
    onHintClick,
    onLeaveGameClick,
    getQuestReward
} from '../actions/gameActions';
import Preload from './preload';
import CoinsArea from './coinsArea';
import LevelArea from './levelArea';
import RatingArea from './ratingArea';
import Game from './game';
import FriendsList from './friendsList';
import SettingsArea from "./settings";
import QuestsArea from "./questsArea";
import {exitFullscreen, toggleFullscreen} from "../utils/fullscreen";

class App extends Component {

    static showInviteBox() {
        exitFullscreen();
        VK.callMethod("showInviteBox");
    }

    static onFullScreenClick() {
        toggleFullscreen();
    }

    render() {
        const props = this.props;

        return <div>
            {!this.props.user.id ? (
                <Preload />
            ) : (
                <div>
                    <Game game={ props.game }
                          user={ props.user }
                          onFindGameClick={ props.onFindGameClick }
                          onCancelFindGameClick={ props.onCancelFindGameClick }
                          onAnswerQuestionClick={ props.onAnswerQuestionClick }
                          onHintClick={ props.onHintClick }
                          onLeaveGameClick={props.onLeaveGameClick}
                    />
                    <LevelArea user={ props.user }/>
                    <QuestsArea quests={ props.user.quests} getQuestReward={props.getQuestReward}/>
                    <SettingsArea onFullScreenClick={App.onFullScreenClick}/>
                    <CoinsArea coins={ props.user.coins } gems={ props.user.gems }/>
                    <RatingArea />
                    <FriendsList friends={this.props.user.friends} showIniteBox={App.showInviteBox}/>
                </div>
            )}
        </div>
    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
        user: state.user,
        game: state.game
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onFindGameClick,
        onCancelFindGameClick,
        onAnswerQuestionClick,
        onHintClick,
        onLeaveGameClick,
        getQuestReward
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);