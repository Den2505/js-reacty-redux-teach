`use strict`;
const Router = require('koa-router');
const userRouter = require('./userRoute');
const friendsShipRouter = require('./friendsShipRoute');
const postRouter = require('./postRoute');
const router = new Router();


router
    ///UserRoutes
    .post(`/signup/`, userRouter.logup)
    .post(`/login/`, userRouter.login)
    .get(`/logout/`, userRouter.logout)
    .get(`/users`, userRouter.getAllUsers)
    .get(`/me`, userRouter.getAuthenticatedUserPage)
    .get(`/users/:id`, userRouter.getUserPageById)
    .delete(`/users/:id`, userRouter.deleteUserById)
    .get('/validate', userRouter.checkAuthenticated)
    ///FriendsRoutes
    .get(`/me/friends`, friendsShipRouter.getAuthenticatedUserFriends)
    .get(`/users/:uid/friends`, friendsShipRouter.getUserFriendsById)
    .get(`/me/friends/requests`, friendsShipRouter.getAuthenticatedUserFriendsRequests)
    .post(`/me/friends/requests/:rid/response`, friendsShipRouter.sendResponseByAuthenticatedUserRequest)
    .delete(`/me/friends/:fid`, friendsShipRouter.removeUserFromAuthenticatedUserFriends)
    .get(`/users/:uid/beMyFriend/`, friendsShipRouter.sendFriendsShipRequest)
    ///PostRoutes
    .get(`/users/:uid/posts/:pid`,postRouter.getPostById)
    .get(`/users/:uid/posts/`, postRouter.getUserPosts)
    .post(`/me/posts/`, postRouter.addNewPostForAuthenticatedUser)
    .get(`/me/posts/`, postRouter.getAuthenticatedUserPosts)
    .delete(`/users/:uid/posts/:pid`, postRouter.deletePostById)
    .get(`/feed`, postRouter.getAuthenticatedUserFeed);

module.exports = router;