import React, {Component} from 'react';

export default class LevelUp extends Component {

    render() {
        return (
            <div>
            <h4>Поздравляем!</h4>
                <div>Вы достигли уровня: {this.props.level}!</div>
            </div>
        )
    }
}