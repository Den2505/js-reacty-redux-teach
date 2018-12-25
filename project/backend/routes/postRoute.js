`use strict`;
const Router = require('koa-router');
const postDao = require(`../dao/postDao`);

const router = new Router();

router.get(`/users/:uid/posts/:pid`, async (ctx) => {

    ctx.response.body = await postDao.getPostById(ctx.params.pid);
})
    .get(`/users/:uid/posts/`, async (ctx) => {
        ctx.response.body = await postDao.getUserPosts(ctx.params.uid)
            .catch((e) => {
                return ctx.throw(400, e);
            });
        // console.log("querying");
    })
    .post(`/me/posts/`, async (ctx) => {
        ctx.response.body = await postDao.createNewPost(ctx.request.body, ctx.state.user.id)
            .catch((e) => {
                return ctx.throw(400, e);
            });
    })
    .get(`/me/posts/`, async (ctx) => {
        ctx.response.body = await postDao.getUserPosts(ctx.state.user.id)
            .catch((e) => {
                return ctx.throw(400, e);
            });
    })
    .delete(`/users/:uid/posts/:pid`, async (ctx) => {
        await postDao.deletePostById(ctx.params.pid)
            .catch((e) => {
                return ctx.throw(400, e);
            });
    })
    .get(`/feed`, async (ctx, next) => {

        const {offset, limit} = ctx.query;
        console.log('Offset '+ offset);
        ctx.response.body = await postDao.getFriendsPosts(ctx.state.user.id, offset, limit)
            .catch((e) => {
                return ctx.throw(400, e);
            });
        await next;
    });

module.exports = router;