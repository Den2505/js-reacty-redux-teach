`use strict`;
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Post = sequelize.define('Post', {
        text: {
            type: Sequelize.STRING(2048)
        },
        user_id: {
            type: Sequelize.INTEGER,
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