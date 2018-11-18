`use strict`;
const Sequelize = require(`sequelize`);

module.exports = function (sequelize) {
    const FriendsShip = sequelize.define('FriendsShip', {
        requester: {
            type: Sequelize.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        responser: {
            type: Sequelize.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        status: {
            type: Sequelize.INTEGER(1)
        }
    }, {
        underscored: true,
        tableName: 'friends_ship'
    });

    FriendsShip.associate = function (models) {
        FriendsShip.belongsTo(models.User,{foreignKey: 'responser'}, {as: 'Responser'});
        FriendsShip.belongsTo(models.User,{foreignKey: 'requester'}, {as: 'Requester'});
    };
    return FriendsShip;
};