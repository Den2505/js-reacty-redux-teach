import React from 'react'
import Post from './Post'

function PostList({posts,currentUser,friends}) {
    const postsElements = posts.map(post =>
      <li key={post.id}>{<Post post = {post} currentUser={currentUser} friends={friends}/>}</li>
    );

    return (
        <ul>
            {postsElements}
        </ul>
    )

}

export default PostList