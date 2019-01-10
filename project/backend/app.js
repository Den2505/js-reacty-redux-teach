'use strict';

const PORT = 3000;
const Koa = require('koa');
const serve = require('koa-static');
const webpack = require('webpack');
const koaBody = require('koa-body');
const port = process.env.PORT || PORT;
const isTest = process.env.NODE_ENV === 'test' ? true : false;
const app = new Koa();
const router = require(`./routes`);
const passport = require(`./middlewares/passport`);
const session = require('koa-generic-session');
const SequelizeSessionStore = require('koa-generic-session-sequelize');
const send = require('koa-send');
//Logging ->
const env = process.env.NODE_ENV || 'development';
const {logger} = require('./configs/config')[env];
const koaLogger = require('koa-bunyan');


const {
    sequelize,
    sequelizePromise
} = require(`./dao/models/index`);

if(!isTest){
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
}


async function run() {
    //logging
    app.use(koaLogger(logger));


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
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.use(serve('public'));
    //Default route
    app.use(async function (ctx) {
        await send(ctx, 'public/index.html')
    });


    return  app.listen(port, () => {
        /* eslint-disable no-console */
        console.log(`Server is started on ${port} port`);
        /* eslint-enable no-console */

        //  return app;

    });
}


const server = sequelizePromise.then(() => {return run();});
//const server = run();

module.exports = server;

