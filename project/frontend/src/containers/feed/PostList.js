import React from 'react'
import Post from './Post'

function PostList({posts}) {
    const postsElements = posts.map(post =>
      <li key={post.id}>{<Post post = {post}/>}</li>
    );

    return (
        <ul>
            {postsElements}
        </ul>
    )

}

export default PostList