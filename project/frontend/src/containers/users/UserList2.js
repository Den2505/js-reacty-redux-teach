import React from 'react'
import User from './User'
//import {setAuthenticatedUserId} from "../redux-components/actions";
import {connect} from 'react-redux'

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: props.users,
            users: []
        }
    }

    componentDidMount() {
        this.mapList(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.friends && !this.props.friends && (nextProps.users || this.props.users)) || nextProps.users !== this.props.users) {

            this.mapList(nextProps)
        }
    }

    mapList(props) {
        if (props.allUsers && props.friends) {
            const users = props.users.map(user => {
                    const a = props.friends.find(friend => friend.id === user.id)
                    if (a) {
                        return <li className='list-group-item' key={a.id}>{<User user={a}/>}</li>
                    }
                    else if (user.id === props.myId) {
                        return <li className='list-group-item' key={user.id}>{<User user={user}/>}</li>
                    }
                    else {
                        return <li className='list-group-item' key={user.id}>{<User enableAddButton={true} user={user}/>}</li>
                    }


                }
            );

            this.setState({users: users})
        }
        else {
            const users = props.users.map(user => {

                    return <li className='list-group-item' key={user.id}>{<User user={user}/>}</li>
                }
            );
            this.setState({users: users})
        }


    }


    render() {
        return (
            <ul className="list-group">
                {this.state.users}
            </ul>
        );
    }

}

function mapStateToProps(store) {

    return {
        friends: store.friends.friends,
        myId: store.AuthenticatedUser.id
    }
}

export default connect(mapStateToProps)(UserList);