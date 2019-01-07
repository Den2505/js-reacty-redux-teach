import React from 'react'
import Post from './Post'

function PostList({posts,currentUser,friends}) {
    const postsElements = posts.map(post =>
      <li key={post.id} style={{listStyleType:'none'}}>{<Post post = {post} currentUser={currentUser} friends={friends}/>}</li>
    );

    return (
        <ul className=''>
            {postsElements}
        </ul>
    )

}

export default PostList