import React from 'react'
import UserList from './UserList2'
import URL from '../../backendDependencies'
import {fetchFriendsList} from "../../redux-components/actions";
import {connect} from 'react-redux'

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //users: [],
            firstName: '',
            secondName: '',
            offset: 50

        };
        this.onChangeForm = this.onChangeForm.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    componentDidMount() {

        this.getUsers()

        if (!this.props.friends && this.props.myId) {
            this.props.fetchFriendsList(this.props.myId)
        }
    }
    componentWillReceiveProps(nextProps){
        if (!this.props.friends && !this.props.myId && nextProps.myId) {
            this.props.fetchFriendsList(nextProps.myId)
        }
    }

    /* componentWillReceiveProps(nextProps){
         if (this.props.friends == undefined && nextProps.friends != undefined) {
             this.props.fetchFriendsList;
         }
     }*/

    getUsers() {
        fetch(URL.getAllUsers())
            .then((res) => res.json())
            .then(users => this.setState({users: users}))
    }

    onUsersLoad() {
        if(this.state.users)
        return <UserList allUsers={true} users={this.state.users}/>
    }

    onChangeForm(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    onSubmitForm(event) {
        event.preventDefault();
        fetch(URL.getAllUsers(this.state.firstName,this.state.secondName))
            .then((res) => res.json())
            .then(users => this.setState({users: users}))
    }

    finder() {
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
                <input name='submit' type='submit' value='Поиск' onClick={this.onSubmitForm}/>
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
        friends: store.friends.friends,
        myId: store.AuthenticatedUser.id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchFriendsList: (myId) => dispatch(fetchFriendsList(myId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)