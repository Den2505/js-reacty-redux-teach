import React from 'react'
import {Link} from "react-router-dom";
import URL from "../../backendDependencies";

class User extends React.Component {
    constructor(props) {
        const {user} = props;
        super(props);

        this.state = {
            user: {
                id: user.id,
                firstName: user.first_name,
                secondName: user.second_name
            }
        }
        this.addUserToFriends = this.addUserToFriends.bind(this);
    }

    user() {

        return (
            <div>
                <Link to={`/users/${this.state.user.id}`}>
                    {`${this.state.user.firstName} ${this.state.user.secondName }`}
                </Link>
                {this.createAddButton()}
            </div>
        )
    }

    createAddButton() {
        if (this.props.enableAddButton) {
            return (
                <button onClick={this.addUserToFriends} className='btn-outline'
                        style={{width: 200, marginLeft: 10}}>Добавить в дружки</button>
            )
        }
    }

    addUserToFriends(event) {
        event.preventDefault();
        event.target.disabled = true
        fetch(URL.beMyFriend(this.state.user.id))


    }

    render() {
        return (
            <div>
                {this.user()}
            </div>
        )
    }
}

export default User