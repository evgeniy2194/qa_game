import React, { Component } from 'react';

export default class SettingsArea extends Component {

    render() {
        return <div id="settingsArea">
            <button onClick={this.props.onFullScreenClick}>Fullscreen</button>
        </div>
    }
}