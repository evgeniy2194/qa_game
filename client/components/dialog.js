import React, {Component} from 'react';
import LevelUp from './dialogs/levelUpDialog';
import GameRewards from './dialogs/gameRewardsDialog';

export default class Dialog extends Component {

    onCloseDialogClick() {
        this.props.onCloseDialogClick(this.props.dialog);
    }

    render() {

        const dialog = this.props.dialog;

        let content = "";
        let display = "none";
        if (dialog) {
            display = "block";

            switch (dialog.type) {
                case 'LEVEL_UP':
                    content = <LevelUp level={dialog.data.level}/>;
                    break;
                case 'GAME_REWARDS':
                    content = <GameRewards result={dialog.data}/>
                    break;
                case 'PROMO':
                    break;
            }
        }

        return <div className="backdrop" style={{display: display}}>
            <div className="dialog">
                <button className="close" onClick={this.onCloseDialogClick.bind(this)}>X</button>
                <div className="clearfix"></div>
                {content}
            </div>
        </div>
    }
}