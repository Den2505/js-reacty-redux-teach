`use strict`;
const Router = require('koa-router');
const friendsDao = require(`../dao/friendsShipDao`);

const router = new Router();

router
    .get(`/me/friends`, async (ctx) => {   //show friends list
        ctx.response.body = await friendsDao.getUserFriends(ctx.state.user.id);
    })
    .get(`/me/friends/requests`, async (ctx) => { //show my friends requests
        ctx.body = await friendsDao.getUserFriendsRequests(ctx.state.user.id);
    })
    .post(`/me/friends/requests/:rid/response`, async (ctx) => { // sed response by request id
        if (ctx.request.body.status === 1)
            ctx.body = await friendsDao.confirmFriendshipRequest(ctx.params.rid);
        if (ctx.request.body.status === -1)
            ctx.body = await friendsDao.rejectFriendshipRequest(ctx.params.rid);
    })
    .delete(`/me/friends/:fid`, async (ctx) => { // delete user from friends by id
        ctx.body = await friendsDao.deleteFriend();
    })
    .get(`/users/:uid/beMyFriend/`, async (ctx) => {
        ctx.body = await friendsDao.requestFriendship(ctx.state.user.id, ctx.params.uid);
    });

module.exports = router;