`use strict`;
const Router = require('koa-router');
const postDao = require(`../dao/postDao`);

const router = new Router();

router.get(`/users/:uid/posts/:pid`, async (ctx, next) => {

       ctx.response.body = await  postDao.getPostById(ctx.params.pid);
    })
    .get(`/users/:uid/posts/`, async (ctx, next) => {
        const post = await  postDao.getUserPosts(ctx.params.uid);
        ctx.response.body = post;
       // console.log("querying");
    })
    .post(`/users/:uid/posts/`, async (ctx, next) => {
        ctx.response.body = await  postDao.createNewPost(ctx.request.body,ctx.params.uid)
    })
    .delete(`/users/:uid/posts/:pid`, async (ctx, next) => {
        await  postDao.deletePostById(ctx.params.pid);
    })
    .get(`/feed/`, async (ctx, next) => {
    });

module.exports = router;