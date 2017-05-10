import React, {Component} from 'react';

export default class FrindsList extends Component {

    render() {
        const friends = this.props.friends;

        return (
            <div id="friends-list">
                <div className="friend">
                    <button id="inviteFriendsBtn" onClick={this.props.showIniteBox}>Invite friend</button>
                </div>
                { friends.map(
                    (friend) => {
                        return ( <div key={friend.uid} className="friend">
                            <img src={friend.photo_50}/>
                        </div> );
                    }
                )}
            </div>
        )
    }
}