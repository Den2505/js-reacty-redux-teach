`use strict`;
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        first_name: {
            type: Sequelize.STRING(50)
        },
        second_name: {
            type: Sequelize.STRING(50)
        },
        email: {
            type: Sequelize.STRING(50)
        },
        hash: {
            type: Sequelize.STRING(50)
        }
    }, {
        underscored: true,
        tableName: 'user'
    });

    User.associate = function (models) {
       User.hasMany(models.Post);
       User.hasMany(models.FriendsShip,{foreignKey: 'responser'});
       User.hasMany(models.FriendsShip,{foreignKey: 'requester'});
    };

    return User;
};