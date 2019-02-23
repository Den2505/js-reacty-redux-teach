import React from 'react'

import UserList from '../users/UserList'
import {fetchFriendsList} from "../../redux-components/actions";
import connect from "react-redux/es/connect/connect";
import URL from '../../backendDependencies'


class FriendsPlace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            uid: props.uid
        };

    }


    componentDidMount() {

        this.getFriendsList(this.state.uid);
    }

    /*componentWillReceiveProps(nextProps) {
        if (this.props.uid !== nextProps.uid) {
            this.getFriendsList(nextProps.uid);
        }
    }*/

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


/*function mapStateToProps(store) {
    return {
        friends: store.friends.friends
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchFriendsList: () => dispatch(fetchFriendsList())
    }
}*/

export default connect(/*mapStateToProps, mapDispatchToProps*/)(FriendsPlace)
