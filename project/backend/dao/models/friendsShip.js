`use strict`;
const Sequelize = require(`sequelize`);

module.exports = function (sequelize) {
    const FriendsShip = sequelize.define('FriendsShip', {
        requester_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        responser_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        status: {
            type: Sequelize.INTEGER(1),  // Implemented redundancy for subscribers function
            allowNull: false,
            validate: {
                max: 1
            }

        }
    }, {
        underscored: true,
            tableName: 'friends_ship'
    });

    FriendsShip.associate = function (models) {
        FriendsShip.belongsTo(models.User, {foreignKey: 'responser_id'}, {as: 'Responser'});
        FriendsShip.belongsTo(models.User, {foreignKey: 'requester_id'}, {as: 'Requester'});
    };
    return FriendsShip;
};