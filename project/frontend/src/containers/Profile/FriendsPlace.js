import React from 'react'

import UserList from '../users/UserList'
import URL from '../../backendDependencies'


class FriendsPlace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: props.uid
        };

    }


    componentDidMount() {

        this.getFriendsList(this.state.uid);
    }


        getFriendsList(id) {

        fetch(URL.getCurrentUserFriends(id))
            .then((req) => req.json())
            .then((friends) => {
                this.setState({friends: friends})
            })
    }

    onFriendsLoad() {


        return <UserList users={this.state.friends || []}/>

    }


    render() {
        return (
            <div>
                <h3>Друзья</h3>
                {this.onFriendsLoad()}
            </div>
        );
    }
}




export default FriendsPlace
