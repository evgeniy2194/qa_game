import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import React, {Component} from 'react';
import {onFindGameClick, onCancelFindGameClick, onAnswerQuestionClick} from '../actions/gameActions';
import Preload from './preload';
import CoinsArea from './coinsArea';
import LevelArea from './levelArea';
import RatingArea from './ratingArea';
import Game from './game';

class App extends Component {

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
                    <CoinsArea coins={ props.user.coins } gems={ props.user.gems }/>
                    <RatingArea />
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