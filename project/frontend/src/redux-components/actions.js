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

/*export const SetFriendsListAndMyId = function (friendsList,myId) {
    return {
        type: "LOAD_Friends_BY_MY_ID",
        payload : {friendsList, myId}
    }
}*/

export const fetchMyIdAndFriendsList = function () {
    return (dispatch) => (
        fetch(URL.validate, {
            method: 'GET'
        })
            .then((res) => {
                    if (res.status !== 401) {
                        res.json().then((id) => {
                            dispatch(fetchFriendsList(id))
                        })
                    }

                }
            )
    )

}

export const setAuthenticatedUserId = function (id) {
    return {
        type: "SET_AUTHENTICATED_USER_ID",
        payload: id
    }
};

