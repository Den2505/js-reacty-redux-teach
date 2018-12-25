import React from 'react'
import UserList from './UserList'
import {fetchFriendsList} from "../../redux-components/actions";
import {connect} from 'react-redux'

class Users extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.friends)
        this.state = {
            users: [],
            text: {
                firstName: '',
                secondName: ''
            }

        };
        this.onChangeForm = this.onChangeForm.bind(this);
    }

    componentDidMount() {

        this.getUsers()

        if (!this.props.friends) {
            this.props.fetchFriendsList()
        }
    }

    /* componentWillReceiveProps(nextProps){
         if (this.props.friends == undefined && nextProps.friends != undefined) {
             this.props.fetchFriendsList;
         }
     }*/

    getUsers() {
        fetch('./users')
            .then((res) => res.json())
            .then(users => this.setState({users: users}))
    }

    onUsersLoad() {
        return <UserList allUsers={true} users={this.state.users}/>
    }

    onChangeForm(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    onSubmitForm(){
        fetch(`/users?limit=${}`)
            .then((res) => res.json())
            .then(users => this.setState({users: users}))
    }

    finder(limit, offset) {
        return (
            <form>
                <label>
                    Фамилия:
                    <input name='secondName' value={this.state.secondName} onChange={this.onChangeForm}/>
                </label>
                <label>
                    Имя:
                    <input name='firstName' value={this.state.firstName} onChange={this.onChangeForm}/>
                </label>
                <input name='submit' type='submit' value='Поиск'/>
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

function mapStateToProps(store) {
    return {
        friends: store.friends.friends
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchFriendsList: () => dispatch(fetchFriendsList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)