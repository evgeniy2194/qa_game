import React, { Component } from 'react';

export default class LevelArea extends Component {

    render() {

        const user = this.props.user;

        return <div id="level-area">
            <span> { user.firstName } { user.lastName }</span><br/>
            <span>
                <img style={{width: "30px", height: "30px"}} src="https://cdn1.iconfinder.com/data/icons/macster/70/.svg-17-128.png"/>
                { user.level }
            </span><br/>
            <span> Опыт: { user.totalExp } / {user.expToNextLevel }</span>
        </div>
    }
}