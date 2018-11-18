`use strict`;
const Router = require('koa-router');
const friendsDao = require(`../dao/friendsShipDao`);

const router = new Router();

router
    .get(`/me/friends`, async (ctx, next) => {   //show friends list
        ctx.response.body = await friendsDao.getUserFriends(ctx.params.id);
    })
    .get(`/me/friends/requests`, async (ctx, next) => { //show my friends requests
       ctx.body = await friendsDao.getUserFriendsRequests();
    })
    .post(`/me/friends/requests/:rid/response`, async (ctx, next) => { // sed response by request id
        ctx.body = await friendsDao.yesIWillBeFriend();
        ctx.body = await friendsDao.noIWontBeFriend();
    })
    .delete(`/me/friends/:fid`, async (ctx, next) => { // delete user from friends by id
        ctx.body = await friendsDao.deleteFriend();
    })
    .get(`/users/:uid/beMyFriend/`, async (ctx,next) => {
        ctx.body = await friendsDao.willBeMyFriend();
    })

module.exports = router;