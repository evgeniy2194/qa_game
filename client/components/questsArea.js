import React, {Component} from 'react';

export default class QuestsArea extends Component {

    render() {
        const quests = this.props.quests;

        return <div id="quests-area">
            Задания:
            {quests.map(
                (quest) => {
                    return ( <div key={quest.id}>{quest.description}</div> );
                }
            )}
        </div>
    }
}