`use strict`;

const postDao = require(`../dao/postDao`);

const postRouter = {
    getPostById: async (ctx) => {

        ctx.response.body = await postDao.getPostById(ctx.params.pid);
    },
    getUserPosts: async (ctx) => {
        ctx.response.body = await postDao.getUserPosts(ctx.params.uid)
            .catch((e) => {
                return ctx.throw(400, e);
            });
    },
    addNewPostForAuthenticatedUser: async (ctx) => {
        ctx.response.body = await postDao.createNewPost(ctx.request.body, ctx.state.user.id)
            .then(()=> ctx.status = 201)
            .catch((e) => {
                return ctx.throw(400, e);
            });
    },
    getAuthenticatedUserPosts: async (ctx) => {
        ctx.response.body = await postDao.getUserPosts(ctx.state.user.id)
            .catch((e) => {
                return ctx.throw(400, e);
            });
    },
    deletePostById: async (ctx) => {
        await postDao.deletePostById(ctx.params.pid)
            .catch((e) => {
                return ctx.throw(400, e);
            });
    },
    getAuthenticatedUserFeed:  async (ctx, next) => {

        const {offset, limit} = ctx.query;
        console.log('Offset ' + offset);
        ctx.response.body = await postDao.getFriendsPosts(ctx.state.user.id, offset, limit)
            .catch((e) => {
                return ctx.throw(400, e);
            });
        await next;
    }

}




module.exports = postRouter;