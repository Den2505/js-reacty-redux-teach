import React from 'react'
import FriendsPlace from './FriendsPlace'
import PostPlace from './PostPlace'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {user: '', posts: []},
            status: '',
            userId: this.props.uid,
        }
    }

    componentDidMount() {

        this.getUserPage()
    }

    getUserPage() {
        fetch('/me')
            .then((res) => res.json())
            .then((usr) => {
                let status;
                if (usr.posts && usr.user.created_at) status = 'me';
                else if (usr.posts) status = 'friend';
                else {
                    status = 'other'
                }
                this.setState({data: usr, status: status})

            })
    }

    onUserLoad() {
        return (
            <h4>{JSON.stringify(this.state.data.user) || ' '}</h4>
        )
    }

    postsValidate(){

            if (this.state.status === 'me' || this.state.status === 'friend')
                return (<PostPlace posts={this.state.data.posts} noAuthor = {true}/>)

    }


    render() {
        return (
            <div>
                {this.onUserLoad()}
                <FriendsPlace/>
                {this.postsValidate()}
                {/*<div><Feed/></div>*/}
            </div>
        )
    }
}

export default Profile