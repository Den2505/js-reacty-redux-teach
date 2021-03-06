`use strict`;
const friendsDao = require(`../dao/friendsShipDao`);

const friendsShipRoute = {

    getUserFriendsById: async (ctx) => {   //show friends list
        ctx.response.body = await friendsDao.getUserFriends(ctx.params.uid)
            .catch((e) => {
                return ctx.throw(400, e);
            });
    },
    getAuthenticatedUserFriendsRequests: async (ctx) => { //show my friends requests
        ctx.body = await friendsDao.getUserFriendsRequests(ctx.state.user.id)
            .catch((e) => {
                return ctx.throw(400, e);
            });
    },
    sendResponseByAuthenticatedUserRequest: async (ctx) => { // sed response by request id
        if (ctx.request.body.status === 1)
            await friendsDao.confirmFriendshipRequest(ctx.params.rid)
                .then(() => ctx.status = 200)
                .catch((e) => {
                    return ctx.throw(400, e);
                });
        if (ctx.request.body.status === -1)
            await friendsDao.rejectFriendshipRequest(ctx.params.rid)
                .then(() => ctx.status = 200)
                .catch((e) => {
                    return ctx.throw(400, e);
                });
    },
    removeUserFromAuthenticatedUserFriends: async (ctx) => { // delete user from friends by id
        ctx.body = await friendsDao.deleteFriend();
    },
    sendFriendsShipRequest: async (ctx) => {
         await friendsDao.requestFriendship(ctx.state.user.id, ctx.params.uid)
             .then(() => {ctx.response.status = 201})
             .catch((e) => {
                 return ctx.throw(400, e);
             });



    }

};

module.exports = friendsShipRoute;