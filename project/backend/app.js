'use strict';

const PORT = 3000;

const Koa = require('koa');
const serve = require('koa-static');
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
    User,
    Post,
    FriendsShip,
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
app.use(postRouter.routes());
app.use(friendsRouter.routes());
app.use(userRouter.allowedMethods());
app.use(postRouter.allowedMethods());
app.use(friendsRouter.allowedMethods());



app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Server is started on ${port} port`);
    /* eslint-enable no-console */
});




/*sequelize.sync({force: true}).then(async () => {

    await function willBeMyFriend(requeterId, responserId) {
        FriendsShip.create({
            requester: requeterId,
            responser: responserId,
            status: 0
        });
    };

    // await function yesIWillBeFriend(shipId) {
    //     FriendsShip.findOne({where: {id: shipId}})
    //         .then((ship)=>{
    //             ship.
    //         })
    //
    // };
    const user1 = await User.create({
        first_name: 'Ivan',
        second_name: 'Ivanov',
        email: '123@iiwi.com',
        //hash: '123'
    });
    const user2 = await User.create({
        first_name: 'Den',
        second_name: 'Den4ik',
        email: '456@iiwi.com',
        hash: '123'
    });

    // const friends = await generateFiendsShip(this,user1.id,user2.id);


    const post = await Post.create({
        text: 'Hi There!'

    });

    await user1.addPosts(post);

    FriendsShip.create({
        requester: user1.id,
        responser: user2.id
    });


    //  console.log( await User.findOne({ where: {id:1}}).then((usr)=>{
    //     return usr.dataValues;
    // }));

    return sequelize.transaction(function (t) {

        // chain all your queries here. make sure you return them.
        return User.create({
            firstName: 'Abraham',
            second_name: 'Lincoln'
        }, {transaction: t}).then(function (user) {


        }).then(function (result) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
        }).catch(function (err) {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback
        });
        // user.destroy();
        // await user.removePosts(post);
    });


});

function generateFiendsShip(seq,requesterID, responserID) {
    return new Promise(seq.FriendsShip.create({
        requester:requesterID,
        responser:responserID
    }));
}*/

