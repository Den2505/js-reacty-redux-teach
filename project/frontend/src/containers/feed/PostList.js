import React from 'react'
import Post from './Post'

function PostList({posts,authenticatedUser,friends}) {
    const postsElements = posts.map(post =>
      <li key={post.id}>{<Post post = {post} authenticatedUser={authenticatedUser} friends={friends}/>}</li>
    );

    return (
        <ul>
            {postsElements}
        </ul>
    )

}

export default PostList