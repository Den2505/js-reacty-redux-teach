import React from 'react';
import Request from './Request'

export default function RequestList({requests}) {
    const requestsElements = requests.map((request) => <li key={request.id}><Request request={request}/></li>)

    return (
        <ul>
            {requestsElements}
        </ul>

    )
}