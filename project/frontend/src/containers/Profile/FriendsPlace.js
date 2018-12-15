import React from 'react'
import UserList from '../users/UserList'


class FriendsPlace extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friends: []
        }
    }


    componentWillMount() {
        this.getUserFriends()
    }

    getUserFriends() {
        fetch('./me/friends')
            .then((req) => req.json())
            .then((friends) => {
                // this.setState({friends: JSON.stringify(friends)})
                this.setState({friends: friends})
            })
    }

    onFriendsLoad() {
        const arr = this.state.friends;

        return <UserList users={arr}/>
    }

    render() {
        return (
            <div>
                {this.onFriendsLoad()}
            </div>
        );
    }
}

export default FriendsPlace