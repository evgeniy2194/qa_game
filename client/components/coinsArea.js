import React, {Component} from 'react';

export default class CoinsArea extends Component {

    render() {
        return <div id="coins-area">
            <span>
                <img style={{width: "30px", height: "30px"}}
                     src="http://www.iconshock.com/img_jpg/BETA/accounting/jpg/128/coin_icon.jpg"/>
                { this.props.coins }
            </span><br/>
            <span>
                <img style={{width: "30px", height: "30px"}}
                     src="https://cdn3.iconfinder.com/data/icons/gems/128/diamond_sapphire-2-128.png"/>
                { this.props.gems }
            </span>
        </div>
    }
}