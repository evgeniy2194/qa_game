import React, {Component} from 'react';

export default class HintCostArea extends Component {
    render() {

        return <span id="hintCost-area">
         <span>
             <img style={{width: "15px", height: "15px"}}
                  src="http://www.iconshock.com/img_jpg/BETA/accounting/jpg/128/coin_icon.jpg"/>
             { this.props.coinsCost?this.props.coinsCost:0 }
         </span>
            <span>
             <img style={{width: "15px", height: "15px"}}
                  src="https://cdn3.iconfinder.com/data/icons/gems/128/diamond_sapphire-2-128.png"/>
                { this.props.gemsCost?this.props.gemsCost:0 }
         </span>
        </span>
    }
}


