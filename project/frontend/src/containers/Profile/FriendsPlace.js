import React from 'react'
//import {bindActionCreators} from 'redux'
//import {connect} from 'react-redux'
import UserList from '../users/UserList'
//import {setFriendsList} from '../../redux-components/actions'


class FriendsPlace2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            uid: props.user
        };
       // console.log(this.props)
        //this.getFriendsList = this.getFriendsList.bind(this)
        //this.onFriendsLoad =this.onFriendsLoad.bind(this)
    }

    componentDidMount() {

        this.getFriendsList();
    }

    getFriendsList() {
        //if (this.state.uid !== undefined)
            fetch(`/users/${this.props.uid}/friends`)
                .then((req) => req.json())
                .then((friends) => {
                    this.setState({friends: friends})
                })
    }

    onFriendsLoad() {
        /*
             this.props.fetchFriendsList;
             return <UserList users={this.props.friends || []}/>*/

        return <UserList users={this.state.friends || []}/>

    }


    render() {
        return (
            <div>
                {this.onFriendsLoad()}
            </div>
        );
    }
}

/*
function mapStateToProps(store) {
    return {
        friends: store.friends.friends
    }
}

function mapDispatchToProps(dispatch) {

    return {
        fetchFriendsList: fetch('./me/friends')
            .then((req) => req.json())
            .then((friends) => {
                dispatch(setFriendsList(friends))
            })
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsPlace)*/
export default FriendsPlace2;
