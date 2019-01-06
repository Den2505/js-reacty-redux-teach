import URL from '../backendDependencies'

export const setFriendsList = function (friendsList) {
    return {
        type: "LOAD_ME_FRIENDS_LIST",
        payload: friendsList
    }
}

export const fetchFriendsList = function (myId) {
    return (dispatch) => (
        fetch(URL.getCurrentUserFriends(myId))
            .then((req) => req.json())
            .then((friends) => {
                dispatch(setFriendsList(friends))
            })
    )

}

export const setAuthenticatedUserId = function (id) {
    return {
        type: "SET_AUTHENTICATED_USER_ID",
        payload: id
    }
};

