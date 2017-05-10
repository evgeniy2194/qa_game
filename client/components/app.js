import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {onFindGameClick, onCancelFindGameClick, onAnswerQuestionClick} from '../actions/gameActions';
import Preload from './preload';
import CoinsArea from './coinsArea';
import LevelArea from './levelArea';
import RatingArea from './ratingArea';
import Game from './game';
import FriendsList from './friendsList';
import VK from '../libs/vk';
import SettingsArea from "./settings";

class App extends Component {

    showInviteBox() {
        VK.callMethod("showInviteBox");
    }

    onFullScreenClick() {
        let elem = document.getElementById("app");

        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement){
        // if (!document.fullScreen && !document.webkitFullScreen && !document.mozFullScreen) {
            if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else {
                elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else {
                document.webkitCancelFullScreen();
            }
        }
    }

    render() {
        const props = this.props;
        let tpl;

        if (!this.props.user._id) {
            tpl = ( <Preload /> );
        } else {
            tpl = (
                <div>
                    <Game game={ props.game }
                          onFindGameClick={ props.onFindGameClick }
                          onCancelFindGameClick={ props.onCancelFindGameClick }
                          onAnswerQuestionClick={ props.onAnswerQuestionClick }
                    />
                    <LevelArea user={ props.user }/>
                    <SettingsArea onFullScreenClick={this.onFullScreenClick}/>
                    <CoinsArea coins={ props.user.coins } gems={ props.user.gems }/>
                    <RatingArea />
                    <FriendsList friends={this.props.user.friends} showIniteBox={this.showInviteBox}/>
                </div>
            );
        }

        return tpl;
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
    return bindActionCreators({onFindGameClick, onCancelFindGameClick, onAnswerQuestionClick}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);