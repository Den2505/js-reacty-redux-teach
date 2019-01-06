


export const friendsReducer = function (store, action) {
    if (action.type === 'LOAD_ME_FRIENDS_LIST') {
        return {
            ...store,
            friends: action.payload,

        }
    }
    return {...store}
};

export const authenticatedUserReducer = function (store, action) {
    if (action.type === 'SET_AUTHENTICATED_USER_ID') {
        return {
            ...store,
            id: action.payload
        }
    }
    return {...store}
}
