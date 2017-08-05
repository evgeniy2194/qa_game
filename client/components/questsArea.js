import React, {Component} from 'react';
import Quest from './quest';

export default class QuestsArea extends Component {

    render() {
        return <div id="quests-area">
            Задания:
            { this.props.quests.map(quest => {
                return <Quest quest={quest} getQuestReward={this.props.getQuestReward.bind(this, quest.userQuestId)}/>
            })}
        </div>
    }
}