'use strict';

const PORT = 3000;

const Koa = require('koa');
//const serve = require('koa-static');
const webpack = require('webpack');
const koaBody = require('koa-body');
const port = process.env.PORT || PORT;
const app = new Koa();
const userRouter = require(`./routes/userRoute`);
const postRouter = require(`./routes/postRoute`);
const friendsRouter = require(`./routes/friendsShipRoute`);
const passport = require(`./middlewares/passport`);
const session = require('koa-generic-session');
const SequelizeSessionStore = require('koa-generic-session-sequelize');


const {
    sequelize,
    sequelizePromise
} = require(`./dao/models/index`);
//const User = require('./model/user');

const compiler = webpack(require('../webpack.config.js'), (err, stats) => {
    if (err || stats.hasErrors()) {
        /* eslint-disable no-console */
        console.log('There are webpack exception', err, stats.toJson('minimal'));
        /* eslint-enable no-console */
        return;
    }

    /* eslint-disable no-console */
    console.log('webpack initialized successfully');
    /* eslint-enable no-console */
});

compiler.watch({}, () => {
    /* eslint-disable no-console */
    console.log('building...');
    /* eslint-enable no-console */
});

async function run() {
    await sequelizePromise.then();
   //await sequelize.sync({force:true});
//app.use(serve('public'));
    app.keys = ['secret'];
    app.use(koaBody());


    app.use(session({
        store: new SequelizeSessionStore(
            sequelize, {
                tableName: 'sessions',
            },
        )
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(userRouter.routes());
    app.use(friendsRouter.routes());
    app.use(postRouter.routes());
    app.use(userRouter.allowedMethods());
    app.use(friendsRouter.allowedMethods());
    app.use(postRouter.allowedMethods());


  return  app.listen(port, () => {
        /* eslint-disable no-console */
        console.log(`Server is started on ${port} port`);
        /* eslint-enable no-console */

      //  return app;

    });
}

const server = run();

module.exports = server;

