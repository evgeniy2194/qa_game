import React, { Component } from 'react';

export default class LevelArea extends Component {

    render() {

        const user = this.props.user;

        return <div id="levelArea">
            <span> { user.firstName } { user.lastName }</span><br/>
            <span> Уровень: { user.level }</span><br/>
            <span> Опыт: { user.exp }</span>
        </div>
    }
}