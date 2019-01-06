import React from 'react'
import PostList from '../feed/PostList'
import URL from '../../backendDependencies'

class PostPlace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: props.posts || [],
            postFormText: ''
        };
        this.onPostFormChange = this.onPostFormChange.bind(this)
        this.onPostAddSubmit = this.onPostAddSubmit.bind(this)

    }

    componentDidMount() {
        // this.getUserPosts(this.props.uid);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.posts !== this.props.posts) {
            this.setState({posts: nextProps.posts})

        }
    }

    getUserPosts() {
        fetch(URL.getCurrentUserPosts(this.props.uid))
            .then(res => res.json())
            .then((posts) => {
                this.setState({posts: posts})
            })

    }

    onPostFormChange(event) {
        this.setState({postFormText: event.target.value})
    }

    onPostAddSubmit(event) {
        fetch(URL.mePosts,  // TODO GET?
            {
                method: 'POST',
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify({text: this.state.postFormText})
            }
        ).then(() => {
            this.getUserPosts()
        })

        event.preventDefault();
    }

    onPostsLoaded() {
        if (this.props.enablePostForm) {
            return (
                <div>
                    <form onSubmit={this.onPostAddSubmit}>
                        <label>
                            Text...
                            <textarea name='Пост' cols={100} value={this.state.postFormText}
                                      onChange={this.onPostFormChange}/>
                        </label>
                        <input type="submit" value="Добавить пост"/>
                    </form>
                    <PostList posts={this.state.posts || [] } authenticatedUser={this.props.authenticatedUser}/>
                </div>
            )
        }
        return (
            <PostList posts={this.props.posts || []} />
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