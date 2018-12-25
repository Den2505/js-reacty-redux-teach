const {
    sequelize,
    sequelizePromise,
    FriendsShip
} = require(`./models/index`);


async function isMyFriend(myId, userId) {
   return sequelize.query(`Select status from friends_ship where ((requester = ${myId} and responser = ${userId}) 
    or (responser = ${myId} and requester = ${userId}) and status = 1 )`, {type: sequelize.QueryTypes.SELECT})
        .then(usr => {
            console.log(JSON.stringify(usr));
            if (usr.length !== 0) {
                if (usr[0].status === 1) {
                    console.log("STATUS TRUE")
                    return true
                }
            }

            else {
                console.log("STATUS FALSE")
                return false
            }
        })


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

async function requestFriendship(requesterId, responrerId) {
    sequelizePromise.then(async () => {
        return sequelizePromise.then(async () => {
            return await FriendsShip.create({requester: requesterId, responser: responrerId, status: 0})
        })

    });
}

async function confirmFriendshipRequest(cortegeId) {

    return sequelizePromise.then(async () => {
        return await FriendsShip.findOne({where: {id: cortegeId}})
            .then(friendsShip => {
                friendsShip.status = 1;
                friendsShip.save();
            })
    })


}

async function rejectFriendshipRequest(cortegeId) {
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
    requestFriendship,
    confirmFriendshipRequest,
    rejectFriendshipRequest,
    /*deleteFriend,
    deleteFriendResponse,*/
    isMyFriend
};