const {
    sequelize,
    FriendsShip,
} = require(`./models/index`);

async function isMyFriend(myId, userId) {
    return await FriendsShip.findAll({
        where: {
            $or: [{
                $and: {
                    requester_id: myId,
                    responser_id: userId
                }
            }, {$and: {responser_id: myId, requester_id: userId}}]
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
    (select requester_id as friend2_id ,responser_id as friend_id from  friends_ship where ( ${myId} = friends_ship.responser_id or ${myId} = friends_ship.requester_id ) and status = 1) as a on (user.id = a.friend_id or user.id = a.friend2_id)
    where id != ${myId} --> в Sequelize не работает
    */

    /*const friends = await User.findAll({
        include:[{
            model: FriendsShip,
           /!* on:{
                requester_id: Sequelize.col('User.id') ,
                responser_id: Sequelize.col('User.id'),
            },*!/
           // where: {$and:{$or:[{[Sequelize.col(FriendsShip.requester_id)]:myId},{[Sequelize.col(FriendsShip.responser_id)]:myId}],status: 1} , $or: [{id:Sequelize.col(FriendsShip.requester_id)},{id:Sequelize.col(FriendsShip.responser_id)}]}
          //  where: {requester_id: Sequelize.col('User.id'),responser_id: Sequelize.col('User.id')}
        }],
       // where: {$ne: {id:myId}}
      //  where: {$and:{$or:[{requester_id:myId}, {responser_id:myId}]}}
    })*/
    // Старый добрый SQL выручает) Оставил запрос с Union так как он более читаемый ->
//</editor-fold>
    const friends = await sequelize.query(
        `select id, first_name, second_name, email from user inner join 
   (select requester_id as friend_id from  friends_ship where ( ${myId} = friends_ship.responser_id) and status = 1) as a on user.id = a.friend_id 
   UNION
   select id, first_name, second_name, email from user inner join 
   (select responser_id as friend_id from  friends_ship where ( ${myId} = friends_ship.requester_id) and status = 1) as a on user.id = a.friend_id`,
        {type: sequelize.QueryTypes.SELECT});

    return friends;
}

async function getUserFriendsRequests(userId) {

    return await FriendsShip.findAll({where: {responser_id: userId, status: 0}})

}

async function requestFriendship(requesterId, responrerId) {

    return await FriendsShip.create({requester_id: requesterId, responser_id: responrerId, status: 0})

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