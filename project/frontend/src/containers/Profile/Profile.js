import React from 'react'
import FriendsPlace from './FriendsPlace'
import PostPlace from './PostPlace'
import RequestList from '../FriendsShip/RequestList'
import {fetchFriendsList} from "../../redux-components/actions";
import connect from "react-redux/es/connect/connect";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {user: '', posts: []},
            status: this.props.status || '',
            userId: this.props.match.params.uid,
        }
        this.addUserToFriends = this.addUserToFriends.bind(this);
        this.deleteUserFromFriends = this.deleteUserFromFriends.bind(this);
    }


    componentDidMount() {
        this.getUserPage(this.state.userId);
        this.getFriendsRequests();
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.uid !== nextProps.uid) {
            this.getUserPage(nextProps.uid);
            this.getFriendsRequests();
        }

    }

    getUserPage(id) {
        console.log(`fetching ${this.props.status}`); // todo FIX STATUS
        const url = () => {
            if (this.props.status === 'me') {
                return '/me'
            } else {
                return `/users/${id}`
            }
        };
        fetch(url())
            .then((res) => res.json())
            .then((usr) => {
                let status;
                if (usr.posts && usr.user.created_at) status = 'me';
                else if (usr.posts) status = 'friend';
                else {
                    status = 'other'
                }
                //if(usr.posts)
                if (usr.posts && Object.keys(usr.posts).length === 0) {
                    this.setState({ data: {user: usr.user, posts: []}, status: status})
                } else this.setState({ data: usr, status: status})


            })
    }

    onUserLoad() {

        if (this.props.uid || this.state.data.user.id)
            return (
                <div>
                    <h4>{JSON.stringify(this.state.data.user) || ' '}</h4>
                    {this.friendsShipEventPlace()}
                    {this.requestsToFriendsPlace()}
                    <FriendsPlace uid={ this.props.uid || this.state.data.user.id }/> {/*  */}
                </div>
            );
        return (
            <h4>{JSON.stringify(this.props.uid) || ' '}</h4>
        )
    }

    postsValidate() {

        if ((this.state.status === 'me' || this.state.status === 'friend') && (this.state.data.user.id)) {
            if (this.state.status === 'me')
                return (<PostPlace posts={this.state.data.posts || []} enablePostForm={true}
                                   uid={this.props.uid || this.state.data.user.id }/>)
            return (<PostPlace posts={this.state.data.posts || []} uid={this.state.data.user.id}/>)
        }

    }

    addUserToFriends(event) {
        fetch(`/users/${this.state.userId}/beMyFriend/`)
        event.target.disabled = true;
    }

    deleteUserFromFriends() {
        fetch(`/me/friends/${this.state.userId}`, {
            method: `DELETE`
        })
    }

    friendsShipEventPlace() {
        if (this.state.status === 'friend') {
            return (
                <button onClick={this.deleteUserFromFriends}>Удалить из друзей</button>
            )
        }
        else if (this.state.status === 'me') {
            return <div></div>
        }
        else return (<button onClick={this.addUserToFriends}>Добавить в дружки</button>)
    }

    getFriendsRequests() {
        fetch(`/me/friends/requests/`)
            .then((res) => res.json())
            .then((requests) => {
                this.setState({friendsRequests: requests})
            })
    }

    requestsToFriendsPlace() {
        //return(<div>{JSON.stringify(this.state.friendsRequests || [])}</div>)
        return (
            <RequestList requests={this.state.friendsRequests || []}/>
        )
    }

    render() {
        return (
            <div>
                {this.onUserLoad()}
                {this.postsValidate()}
                {/*<div><Feed/></div>*/}
            </div>
        )
    }
}

export default Profile