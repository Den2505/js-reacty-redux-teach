import React from 'react'

export default class Request extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            request: props.request,
        }

        this.confirmFriendsShip = this.confirmFriendsShip.bind(this);
        this.rejectFriendsShip =this.rejectFriendsShip.bind(this);
    }

    componentDidMount() {
        this.getRequester();
    }

    getRequester() {
        fetch(`/users/${this.state.request.requester}`)
            .then((res) => res.json())
            .then((requester) => this.setState({requester: requester}))
    }

    confirmFriendsShip() {
        fetch(`/me/friends/requests/${this.state.request.id}/response`,
            {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({status:1})
            })

    }

    rejectFriendsShip() {
        fetch(`/me/friends/requests/${this.state.request.id}/response`,
            {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({status:-1})
            })

    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state.requester) || ""}
                <button onClick={this.confirmFriendsShip}>Принять</button>
                <button onClick={this.rejectFriendsShip}>Отклонить</button>
            </div>
        );
    }

}