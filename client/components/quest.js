import React, {Component} from 'react';

export default class Quest extends Component {

    render() {
        const quest = this.props.quest;
        const getQuestReward = this.props.getQuestReward;
        const getRewardBtn = <button onClick={getQuestReward.bind(this, quest.userQuestId)}>Получить награду</button>;

        return <div className="quest">
            <div key={quest.id}>
                <div>{quest.description} {quest.progress}/{quest.requirements} </div>
                <div>
                    <label>Награда:</label>
                    {quest.rewardCount} {quest.rewardType}
                </div>
                <div>
                    {quest.isDone ? 'Выполнен' : ''}
                    {quest.isDone && quest.isReceivedReward ? getRewardBtn : ''}
                </div>
            </div>
        </div>
    }
}