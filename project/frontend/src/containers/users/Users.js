import React from 'react'
import UserList from './UserList'

class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentWillMount(){
        this.getUsers()
    }

    getUsers() {
        fetch('./users')
            .then((res) => res.json())
            .then(users => this.setState({users:users}))
    }

    onUsersLoad(){
        return <UserList users = {this.state.users}/>
    }

    finder(limit, offset) {
        return (
            <form>
                <label>
                    Фамилия:
                    <input/>
                </label>
                <label>
                    Имя:
                    <input/>
                </label>
            </form>
        )
    }

    render() {
        return (
            <div>
                <header>Пользователи</header>
                {this.finder()}
                {this.onUsersLoad()}
            </div>
        );
    }
}

export default Users