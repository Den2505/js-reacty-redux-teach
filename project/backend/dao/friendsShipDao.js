const {
    sequelize,
    sequelizePromise,
    User,
    Post,
    FriendsShip
} = require(`./models/index`);

async function getUserFriends(id) {
   return sequelizePromise.then(async () => {
 return User.findAll({

 });
    });
}

async function getUserFriendsRequests(userId) {
   return sequelizePromise.then(async () => {

    });
}

async function willBeMyFriend(requesterId,responrerId) {
    sequelizePromise.then(async () => {

    });
}

async function yesIWillBeFriend(requesterId,responrerId) {
    sequelizePromise.then(async () => {

    });


}

async function noIWontBeFriend(requesterId,responrerId) {
    sequelizePromise.then(async () => {

    })
}

async function deleteFriend(requesterId,responrerId) {

}

async function deleteFriendResponse(requesterId,responrerId) {

}

module.exports = {
    getUserFriends,
    getUserFriendsRequests,
    willBeMyFriend,
    yesIWillBeFriend,
    noIWontBeFriend,
    deleteFriend,
    deleteFriendResponse
};