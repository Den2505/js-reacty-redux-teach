`use strict`;
const Router = require('koa-router');
const userRouter = require('./userRoute');
const friendsShipRouter = require('./friendsShipRoute');
const postRouter = require('./postRoute');
const router = new Router();

router.prefix('/api');
router
    ///UserRoutes
    .post(`/signup/`, userRouter.logup)
    .post(`/login/`, userRouter.login)
    .get(`/logout/`, userRouter.logout)
    .get(`/users`, userRouter.getAllUsers)
    .get(`/profile`, userRouter.getAuthenticatedUserPage)
    .get(`/users/:id`, userRouter.getUserPageById)
    .delete(`/users/:id`, userRouter.deleteUserById)
    .get('/validate', userRouter.checkAuthenticated)
    ///FriendsRoutes
    //.get(`/me/friends`, friendsShipRouter.getAuthenticatedUserFriends)
    .get(`/users/:uid/friends`, friendsShipRouter.getUserFriendsById)
    .get(`/profile/friends/requests`, friendsShipRouter.getAuthenticatedUserFriendsRequests)
    .post(`/profile/friends/requests/:rid/response`, friendsShipRouter.sendResponseByAuthenticatedUserRequest)
    .delete(`/profile/friends/:fid`, friendsShipRouter.removeUserFromAuthenticatedUserFriends)
    .get(`/users/:uid/beMyFriend/`, friendsShipRouter.sendFriendsShipRequest)
    ///PostRoutes
    .get(`/users/:uid/posts/:pid`,postRouter.getPostById)
    .get(`/users/:uid/posts/`, postRouter.getUserPosts)
    .post(`/profile/posts/`, postRouter.addNewPostForAuthenticatedUser)
    .delete(`/users/:uid/posts/:pid`, postRouter.deletePostById)
    .get(`/feed`, postRouter.getAuthenticatedUserFeed);

module.exports = router;