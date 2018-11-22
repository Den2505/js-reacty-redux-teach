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
            ctx.throw(400, e)
        });
    ctx.redirect(`/login/`);
    ctx.status = 201;


    await next;
});
router.post(`/login/`, async (ctx, next) => {
    await passport.authenticate('local', {}, async (err, user) => {
        console.log(`authenticate USER: ${user}`);
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
    })(ctx);
    await next;
});

router.get(`/logout/`, async (ctx)=>{
    await ctx.logout();
    ctx.redirect(`/`);
});

router.get(`/users/`, async (ctx, next) => {
    if (ctx.isUnauthenticated()) {
        ctx.throw(401, 'Unauthenticated');
    }

    const{first_name, second_name, email} = ctx.query;
    console.log(first_name);
    const users = await userDao.getAllUsers(first_name, second_name, email);
    ctx.response.body = users;
    await next;
});

router.get(`/me`, async (ctx, next) => {
    if (ctx.isUnauthenticated()) {
        ctx.throw(401, 'Unauthenticated');
    }
    ctx.body = ctx.state.user;
    await next;
});

router.get(`/users/:id`, async (ctx, next) => {
    const user = await userDao.getUserById(ctx.params.id);
    if (ctx.isUnauthenticated()) {
        const data = {first_name: user.first_name, second_name: user.second_name};
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
            if (friendsDao.isMyFriend(ctx.state.user.id, ctx.params.id)) {
                const qwe = {first_name: user.first_name, second_name: user.second_name, email: user.email};
                const posts = postDao.getUserPosts(ctx.params.id);
                const data = {user: qwe, posts: posts};
                ctx.response.body = data;
                ctx.end;

            }
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


module.exports = router;