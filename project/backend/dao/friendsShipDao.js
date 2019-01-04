const {
    sequelize,
    FriendsShip,
} = require(`./models/index`);

async function isMyFriend(myId, userId) {
    return await FriendsShip.findAll({
        where: {
            $or: [{
                $and: {
                    requester: myId,
                    responser: userId
                }
            }, {$and: {responser: myId, requester: userId}}]
        }
    })
        .then(usr => {
            if (usr.length !== 0) {
                if (usr[0].dataValues.status === 1) {
                    return true
                }
            }

            else {
                return false
            }
        })


}

async function getUserFriends(myId) {
//<editor-fold desc="Comments">
    //Sequelize не поддерживает множественный Join(Multiply JOIN. TWO causes in ON alias), также как и Union.   ->

    /*select id, first_name, second_name, email from user  inner join
    (select requester as friend2_id ,responser as friend_id from  friends_ship where ( ${myId} = friends_ship.responser or ${myId} = friends_ship.requester ) and status = 1) as a on (user.id = a.friend_id or user.id = a.friend2_id)
    where id != ${myId} --> в Sequelize не работает
    */

    /*const friends = await User.findAll({
        include:[{
            model: FriendsShip,
           /!* on:{
                requester: Sequelize.col('User.id') ,
                responser: Sequelize.col('User.id'),
            },*!/
           // where: {$and:{$or:[{[Sequelize.col(FriendsShip.requester)]:myId},{[Sequelize.col(FriendsShip.responser)]:myId}],status: 1} , $or: [{id:Sequelize.col(FriendsShip.requester)},{id:Sequelize.col(FriendsShip.responser)}]}
          //  where: {requester: Sequelize.col('User.id'),responser: Sequelize.col('User.id')}
        }],
       // where: {$ne: {id:myId}}
      //  where: {$and:{$or:[{requester:myId}, {responser:myId}]}}
    })*/
    // Старый добрый SQL выручает) Оставил запрос с Union так как он более читаемый ->
//</editor-fold>
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

    return await FriendsShip.findAll({where: {responser: userId, status: 0}})

}

async function requestFriendship(requesterId, responrerId) {

    return await FriendsShip.create({requester: requesterId, responser: responrerId, status: 0})

}

async function confirmFriendshipRequest(cortegeId) {

    return await FriendsShip.findOne({where: {id: cortegeId}})
        .then(friendsShip => {
            friendsShip.status = 1;
            friendsShip.save();
        })

}

async function rejectFriendshipRequest(cortegeId) {
    return await FriendsShip.findOne({where: {id: cortegeId}})
        .then(friendsShip => {
            friendsShip.status = -1;
            friendsShip.save();
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