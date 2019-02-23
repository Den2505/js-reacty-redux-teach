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
                <div className='form-group'>
                    <form>
                        <div className='col-auto col-sm-auto'>
                            <label>Пост</label>
                            <textarea name='Пост' cols={100} value={this.state.postFormText}
                                      onChange={this.onPostFormChange} className='form-control' rows='3' maxLength='2048'/>
                        </div>
                        <div className='form-group col-auto' style={{marginTop:10}}>
                            <input onClick={this.onPostAddSubmit} type="submit" value="Опубликовать"
                                   className='btn btn-primary'/>
                        </div>
                    </form>
                    <PostList  posts={this.state.posts || []} currentUser={this.props.currentUser}/>
                </div>
            )
        }
        return (
            <PostList posts={this.props.posts || []} currentUser={this.props.currentUser}/>
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