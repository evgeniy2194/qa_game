import React, { Component } from 'react';

export default class CoinsArea extends Component {

    render() {
        return <div id="coinsArea">
            <span>Монеты: { this.props.coins }</span>
        </div>
    }
}