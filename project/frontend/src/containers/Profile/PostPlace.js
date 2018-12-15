import React from 'react'
import PostList from '../feed/PostList'

class PostPlace extends React.Component {
    constructor(props) {
        super(props);

        this.state = {posts: props.posts || []};

      //  this.getUserPosts = this.getUserPosts.bind(this)
        this.onPostsLoaded = this.onPostsLoaded.bind(this)
    }


    /*getUserPosts() {
        fetch('/me/posts')
            .then(res => res.json())
            .then((posts) =>{
                this.setState({posts:posts})
            })

    }*/

    onPostsLoaded() {
        return (
            <PostList posts={this.state.posts || []}/>
        )
    }

    render() {
        return (
            <div>
                {this.onPostsLoaded()}
            </div>
        )
    }
}

export default PostPlace;