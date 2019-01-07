import React from 'react'
import User from './User'

function UserList({users, allUsers}) {
    const usersElements = users.map(user =>
        <li  key={user.id} style={{listStyleType:'none'}}>{<User  user = {user}/> }</li>
    );

    return (
        <ul>
            {usersElements}
        </ul>
    )

}

export default UserList;