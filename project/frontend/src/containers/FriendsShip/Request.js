import React from 'react'
import URL from '../../backendDependencies'

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
        fetch(URL.getCurrentUser(this.state.request.requester_id))
            .then((res) => res.json())
            .then((requester) => {this.setState({requester: requester}); debugger})
    }

    confirmFriendsShip() {
        fetch(URL.friendsShipResponse(this.state.request.id),
            {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({status:1})
            })

    }

    rejectFriendsShip() {
        fetch(URL.friendsShipResponse(this.state.request.id),
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