/* eslint-disable react/prop-types */
import React from 'react'
import PostAuthor from './PostAuthor'
import URL from '../../backendDependencies'
import {connect} from 'react-redux'

class Post extends React.Component {
    constructor(props) {
        const {post} = props;
        super(props);
        this.state = {
            id: post.id,
            text: post.text,
            user_id: post.user_id,
            updated_at: post.updated_at
        };


    }

    componentDidMount() {
        this.getAuthor();
    }

    getAuthor() {

            if (this.props.currentUser) {
                this.setState({userData: this.props.currentUser})
            }
           /* else
                fetch(URL.getCurrentUser(this.state.user_id))
                    .then((response) =>
                        response.json()
                    )
                    .then((data) => {
                        this.setState({userData: data.user})
                    })*/

        else if(this.props.friends) {
            const user = this.props.friends.find((friend)=> friend.id === this.state.user_id);
            this.setState({userData: user})
        }


    }

    loadUser() {
        if (this.state.userData) {
            return (<PostAuthor user={this.state.userData}/>)
        }
        else return (<div>loading...</div>)
    }


    render() {
        return (
            <div>
                {this.loadUser()}
                <h4>{this.state.text}</h4>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
         friends: store.friends.friends,
    }
}

export default connect()(Post);