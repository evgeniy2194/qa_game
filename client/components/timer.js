import React, {Component} from 'react';
import moment from 'moment';

export default class Timer extends Component {

    timerId = null;
    endTime = null;

    constructor(props) {
        super(props);

        this.state = {
            secondsLeft: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.endTime !== this.props.endTime) {
            this.setState({secondsLeft: 0});

            if (this.timerId) {
                clearInterval(this.timerId);
            }

            if (nextProps.endTime) {
                this.endTime = moment.utc(nextProps.endTime);
                this.timerId = setInterval(this.tick.bind(this), 200);
            }
        }
    }

    componentWillUnmount() {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
    }

    tick() {
        let diff = Math.round((this.endTime - moment.utc()) / 1000);

        if (diff < 0) {
            diff = 0
        }

        if (this.state && Math.round(this.state.secondsLeft) !== diff) {
            this.setState({secondsLeft: diff});
        }
    }

    render() {
        return <div>{ this.state.secondsLeft }</div>
    }
}

Timer.defaultProps = {
    endTime: null,
};