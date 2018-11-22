const {
    sequelize,
    sequelizePromise,
    FriendsShip
} = require(`./models/index`);


async function isMyFriend(myId, userId) {
    return sequelize.query(`Select status from friends_ship where ((requester = ${myId} and responser = ${userId}) 
    or (responser = ${myId} and requester = ${userId}) and status = 1 )`, {type: sequelize.QueryTypes.SELECT})
        ? true
        : false;
}

/////Select * from  friends_ship where (1 = friends_ship.requester or 1 = friends_ship.responser) and status = 1
async function getUserFriends(myId) {
    const friends = await sequelize.query(
        `select id, first_name, second_name, email from user inner join 
   (select requester as friend_id from  friends_ship where ( ${myId} = friends_ship.responser) and status = 1) as a on user.id = a.friend_id 
   UNION
   select id, first_name, second_name, email from user inner join 
   (select responser as friend_id from  friends_ship where ( ${myId} = friends_ship.requester) and status = 1) as a on user.id = a.friend_id`,
        {type: sequelize.QueryTypes.SELECT});

    return friends;
}

async function getUserFriendsRequests(userId) {
    return sequelizePromise.then(async () => {
        return FriendsShip.findAll({where: {responser: userId, status: 0}})

    });
}

async function willBeMyFriend(requesterId, responrerId) {
    sequelizePromise.then(async () => {
        return sequelizePromise.then(async () => {
            return await FriendsShip.create({requester: requesterId, responser: responrerId, status: 0})
        })

    });
}

async function yesIWillBeFriend(cortegeId) {

    return sequelizePromise.then(async () => {
        return await FriendsShip.findOne({where: {id: cortegeId}})
            .then(friendsShip => {
                friendsShip.status = 1;
                friendsShip.save();
            })
    })


}

async function noIWontBeFriend(cortegeId) {
    sequelizePromise.then(async () => {
        return sequelizePromise.then(async () => {
            return await FriendsShip.findOne({where: {id: cortegeId}})
                .then(friendsShip => {
                    friendsShip.status = -1;
                    friendsShip.save();
                })
        })

    })
}

/*async function deleteFriend(requesterId, responrerId) {

}

async function deleteFriendResponse(requesterId, responrerId) {

}*/

module.exports = {
    getUserFriends,
    getUserFriendsRequests,
    willBeMyFriend,
    yesIWillBeFriend,
    noIWontBeFriend,
    /*deleteFriend,
    deleteFriendResponse,*/
    isMyFriend
};