import React from 'react'
import User from './User'

function UserList({users}) {
    const usersElements = users.map(user =>
        <li key={user.id}>{<User user = {user}/>}</li>
    );

    return (
        <ul>
            {usersElements}
        </ul>
    )

}

export default UserList;