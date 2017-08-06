import React, {Component} from 'react';

export default class GameRewards extends Component {

    render() {

        const result = this.props.result;
        const keys = Object.keys(result);

        let tpl = "";

        keys.sort().reverse();

        keys.forEach(key => {
            const users = result[key];

            users.forEach(user => {
                tpl += key + ' ' + user.firstName + ' ' + user.lastName + ' coins: ' + user.coins + ' exp: ' + user.exp + ' gems: ' + user.gems;
            });
        });

        tpl = ( <div><span>Результаты игры:</span><br/>{ tpl } </div>);

        return (
            <div>
                <h4>Результаты игры!</h4>
                <div>{tpl}</div>
            </div>
        )
    }
}