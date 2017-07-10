import React, {PropTypes, Component} from 'react'

export default class UserInfo extends Component {
    click() {
        this.props.onClick('trololo');
    }

    render() {
        const firstName = this.props.user.firstName;
        const lastName = this.props.user.lastName;
        const uid = this.props.user.uid;

        return <div>
            <p>Привет, {firstName} {lastName}!</p>
            <p>Ваш ид: {uid}</p>
        </div>;
    }
}
