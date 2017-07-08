import React, { Component } from 'react';

export default class SettingsArea extends Component {

    render() {
        return <div id="settings-area">
            <button onClick={this.props.onFullScreenClick}>Fullscreen</button>
        </div>
    }
}