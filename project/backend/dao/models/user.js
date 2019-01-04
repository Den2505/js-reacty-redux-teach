`use strict`;
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        first_name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty : {msg: "First name field can`t be empty"}
            }

        },
        second_name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty : {msg: "Last name field can`t be empty"}
            }
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: {args:true , msg: `Email already in use`},
            validate: {
                notEmpty : {msg: "Email field can`t be empty"},
                isEmail:{msg: "Invalid Email"},
            }
        },
        hash: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: { msg:"FrontEnd md5 error"}
            }
        }
    }, {
        underscored: true,
        tableName: 'user'
    });

    User.associate = function (models) {
       User.hasMany(models.Post);
       User.hasMany(models.FriendsShip,{foreignKey: 'responser_id'});
       User.hasMany(models.FriendsShip,{foreignKey: 'requester_id'});
    };

    return User;
};