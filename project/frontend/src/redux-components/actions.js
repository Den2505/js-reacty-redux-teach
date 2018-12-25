import getUserFriends from '../backendDependencies'

export const setFriendsList = function (friendsList) {
    return {
        type: "LOAD_ME_FRIENDS_LIST",
        payload: friendsList
    }
}

export const fetchFriendsList = function () {
    return (dispatch) => (
        fetch('./me/friends')
            .then((req) => req.json())
            .then((friends) => {
                dispatch(setFriendsList(friends))
            })
    )

}

