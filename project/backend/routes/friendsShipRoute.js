`use strict`;
const friendsDao = require(`../dao/friendsShipDao`);

const friendsShipRoute = {
    getAuthenticatedUserFriends: async (ctx) => {   //show friends list
        ctx.response.body = await friendsDao.getUserFriends(ctx.state.user.id);
    },
    getUserFriendsById: async (ctx) => {   //show friends list
        ctx.response.body = await friendsDao.getUserFriends(ctx.params.uid);
    },
    getAuthenticatedUserFriendsRequests: async (ctx) => { //show my friends requests
        ctx.body = await friendsDao.getUserFriendsRequests(ctx.state.user.id);
    },
    sendResponseByAuthenticatedUserRequest: async (ctx) => { // sed response by request id
        if (ctx.request.body.status === 1)
            ctx.body = await friendsDao.confirmFriendshipRequest(ctx.params.rid);
        if (ctx.request.body.status === -1)
            ctx.body = await friendsDao.rejectFriendshipRequest(ctx.params.rid);
    },
    removeUserFromAuthenticatedUserFriends: async (ctx) => { // delete user from friends by id
        ctx.body = await friendsDao.deleteFriend();
    },
    sendFriendsShipRequest: async (ctx) => {
        ctx.body = await friendsDao.requestFriendship(ctx.state.user.id, ctx.params.uid);
    }

}

module.exports = friendsShipRoute;