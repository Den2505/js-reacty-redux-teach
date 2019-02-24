import React from 'react'
import User from './User'
import {connect} from 'react-redux'
import {fetchMyIdAndFriendsList} from '../../redux-components/actions'

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: props.users,
            users: [],
            friends: props.friends,
        }
    }

    componentDidMount() {
            this.props.fetchFriendsList();
        this.mapList(this.state);
    }



    static getDerivedStateFromProps(props, state) {
        if ((props.friends && !state.friends &&(props.users || state.allUsers)) || props.users !== state.allUsers) {
            return {allUsers: props.users, friends: props.friends}
        }
        return null;
    }

    mapList(props) {
        if (props.allUsers && props.friends) {
            const users = props.allUsers.map(user => {
                    const a = props.friends.find(friend => friend.id === user.id)
                    if (a) {
                        return <li className='list-group-item' key={a.id}>{<User user={a}/>}</li>
                    }
                    else if (user.id === props.myId) {
                        return <li className='list-group-item' key={user.id}>{<User user={user}/>}</li>
                    }
                    else {
                        return <li className='list-group-item' key={user.id}>{<User enableAddButton={true}
                                                                                    user={user}/>}</li>
                    }

                }
            );

            return users;
        }



    }

    onUsersLoad(){
        if(this.state.friends){
            return this.mapList(this.state)
        }
    }


    render() {
        return (
            <ul className="list-group">
                {this.onUsersLoad()}
            </ul>
        );
    }

}
function mapDispatchToProps(dispatch) {
    return{
        fetchFriendsList: ()=> dispatch(fetchMyIdAndFriendsList())
    }
}
function mapStateToProps(store) {

    return {
        friends: store.friends.friends,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);