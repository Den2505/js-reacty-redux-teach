`use strict`;
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Post = sequelize.define('Post', {
        text: {
            type: Sequelize.STRING(2048),
            allowNull:false,
            validate:{
                max:{args:[2048] , msg: "maximum message length can not exceed 2048"},
                notEmpty: {msg: "Post can`t be empty"}
            }
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull:false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    }, {
        underscored: true,
        tableName: 'post'
    });

    Post.associate = function (models) {
        Post.belongsTo(models.User, {foreignKey: 'user_id'});
    };
    return Post;
};