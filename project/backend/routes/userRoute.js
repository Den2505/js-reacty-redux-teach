`use strict`;
const Router = require('koa-router');
const userDao = require(`../dao/userDao`);
const router = new Router();
const passport = require(`../middlewares/passport`);
const controller = require(`./backend/controllers/userController`);

router.post(`/logup/`, async (ctx, next) => {
    try {
        const user = ctx.request.body;
        await controller.validate(user);
        await userDao.userAdd(ctx.request.body);
        ctx.status = 201;
    }
    catch (e) {
        ctx.throw(404,e.message);
    }

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

router.get(`/users/`, async (ctx, next) => {
    if (ctx.isUnauthenticated()) {
        ctx.throw(401, 'Unauthenticated');
    }
    const users = await userDao.getAllUsers();
    ctx.response.body = users;
    await next;
});

router.get(`/users/me`, async (ctx, next) => {
    if (ctx.isUnauthenticated()) {
        ctx.throw(401, 'Unauthenticated');
    }
    ctx.body = ctx.state.user;
    await next;
});

router.get(`/users/:id`, async (ctx, next) => {
    if (ctx.isUnauthenticated()) {
        ctx.throw(401, 'Unauthenticated');
    }
    const user = await userDao.getUserById(ctx.params.id);
    ctx.response.body = user;
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