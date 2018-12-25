export const friendsReducer1 = function (store) {

    const newStore = {
        ...store,
        friends: [{
            id: 1,
            first_name: "Den",
            second_name: "Den",
            email: 'test@',
        }


        ]
    }
    return newStore

}


export const friendsReducer = function (store, action) {
    if (action.type === 'LOAD_ME_FRIENDS_LIST') {
        return {
            ...store,
            friends: action.payload,


        }
    }
    return {...store}
}
