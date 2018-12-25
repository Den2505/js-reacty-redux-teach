//this object contains fetch requests to backend

function  getUserFriends() {
    fetch('./me/friends')
        .then((req) => req.json())
        .then((friends) => {
            // this.setState({friends: JSON.stringify(friends)})
            this.setState({friends: friends})
        })
}

export default getUserFriends