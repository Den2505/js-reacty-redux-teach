`use strict`;
const Router = require('koa-router');
const userDao = require(`../dao/userDao`);
const friendsDao = require(`../dao/friendsShipDao`);
const postDao = require(`../dao/postDao`);
const router = new Router();
const passport = require(`../middlewares/passport`);


router.post(`/logup/`, async (ctx, next) => {

    await userDao.userAdd(ctx.request.body)
        .catch((e) => {
            ctx.throw(400, e);

        });
    ctx.status = 201;
    //ctx.redirect(`/login/`);


    await next;
});
router.post(`/login/`, async (ctx, next) => {
    await passport.authenticate('local', {}, async (err, user) => {
        console.log(`authenticate USER: ${user.id}`);
        if (!user) {
            ctx.throw(401, 'Incorrect login/password');
        }

        ctx.login(user, (err) => {
            if (err) {
                ctx.throw(401, err.message);
            }
            ctx.status = 200;
            ctx.body = user;
        });
        //ctx.response.body = user;
    })(ctx);

    await next;
});

router.get(`/logout/`, async (ctx) => {
    await ctx.logout();
    ctx.redirect(`/`);
});

router.get(`/users/`, async (ctx, next) => {
    if (ctx.isUnauthenticated()) {
        ctx.throw(401, 'Unauthenticated');
    }

    const {first_name, second_name, email} = ctx.query;
    const users = await userDao.getAllUsers(first_name, second_name, email);
    ctx.response.body = users;
    await next;
});

router.get(`/me`, async (ctx, next) => {
    if (ctx.isUnauthenticated()) {
        ctx.throw(401, 'Unauthenticated');
    }
    const posts = await postDao.getUserPosts(ctx.state.user.id);

    ctx.body = {user:ctx.state.user, posts:Object.assign([],posts)};
    await next;
});

router.get(`/users/:id`, async (ctx, next) => {
    const user = await userDao.getUserById(ctx.params.id);
    if (ctx.isUnauthenticated()) {
        const data = {id:user.id,first_name: user.first_name, second_name: user.second_name};
        ctx.response.body = data;
        ctx.end;
        // ctx.throw(401, 'Unauthenticated');
    }
    else {

        if (ctx.params.id == ctx.state.user.id) {
            ctx.redirect(`/me`);
            ctx.end;
        }
        else {
         await friendsDao.isMyFriend(ctx.state.user.id, ctx.params.id).then(async bool => {
                if(bool){
                    const res = {id:user.id,first_name: user.first_name, second_name: user.second_name, email: user.email};
                    const posts =  await postDao.getUserPosts(ctx.params.id);
                    const data = {user: res, posts: posts};
                    ctx.response.body = data;
                    ctx.end;
                }
                else {
                    const res = {id:user.id,first_name: user.first_name, second_name: user.second_name, email: user.email};
                    //const posts = postDao.getUserPosts(ctx.params.id);
                    const data = {user: res};
                    ctx.response.body = data;
                    ctx.end;
                }
            });

        }
    }


    await next;
});


router.delete(`/users/:id`, async (ctx, next) => {
    if (ctx.isUnauthenticated()) {
        ctx.throw(401, 'Unauthenticated');
    }
    if (ctx.params.id !== ctx.state.user.id) {
        ctx.throw(401, 'Unauthenticated');
    }
    await userDao.deleteUser(ctx.params.id);
    ctx.response.body = "Deleted";
    await next;
});

router.get('/logout', async (ctx, next) => {
    if (ctx.isUnauthenticated()) {
        ctx.throw(401, 'Unauthenticated');
    }
    await ctx.logout();
    await next;
});

router.get('/validate', async (ctx, next) => {
    if (ctx.isUnauthenticated()) {
        ctx.throw(401, 'Unauthenticated');
    }
    await next;
});


module.exports = router;