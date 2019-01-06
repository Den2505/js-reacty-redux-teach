//this object contains fetch requests to backend
const prefix = '/api/';

const BackendURL = {
    signUp: prefix + 'signup',
    signIn: prefix + 'login',
    allUsersList: prefix + 'users',
    getCurrentUser: function (uid) {
        return `${prefix}users/${uid}`
    },
    validate: prefix + 'validate',
    feed: function (offset, limit) {
        return prefix + `feed?offset=${offset}&limit=${limit}`
    },
    friendsShipResponse: function (requestId) {
        return prefix + `profile/friends/requests/${requestId}/response`
    },
    getCurrentUserFriends: function (uid) {
        return prefix + `users/${uid}/friends`
    },
    getCurrentUserPosts: function (uid) {
        return prefix + `users/${uid}/posts`
    },

    mePosts: prefix + 'profile/posts', // Only POST method
    me: prefix + 'profile',
    //////////
    /*meFriend: function (uid) {
        return prefix + `me/friends/${uid}`
    },*/
    beMyFriend: function (uid) {
        return prefix + `users/${uid}/beMyFriend`
    },
    meFriendsRequests : prefix +'profile/friends/requests',
    getAllUsers: function (firstName = '', secondName = '') {
        return prefix + `users?first_name=${firstName}&second_name=${secondName}`
    }


};

export default BackendURL