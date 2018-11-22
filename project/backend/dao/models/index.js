`use strict`;
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const {db}  = require('../../configs/config')[env];

const sequelize = new Sequelize(db.name, db.username, db.password, {
    host: db.host,
    port: db.port,
    dialect: db.dialect,
});

const User = require('./user')(sequelize);
const FriendsShip = require('./friendsShip')(sequelize);
const Post = require('./post')(sequelize);

const models = {
    [User.name]: User,
    [FriendsShip.name]: FriendsShip,
    [Post.name]: Post
};

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

const sequelizePromise =  sequelize.sync({force: true}) ;
//const sequelizePromise = async function(){return await sequelize.sync({force: true})} ;

module.exports = {
    sequelize,
    User,
    Post,
    FriendsShip,
    sequelizePromise
};