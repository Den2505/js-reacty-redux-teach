const {
    sequelize,
    Post
} = require(`./models/index`);

async function getUserPosts(userId) {
    return await Post.findAll({where: {user_id: userId}})
        .then((posts) => {
            return posts;
        });
}

async function getPostById(id) {
    return await Post.findOne({where: {id: id}})
        .then((post) => {
            return post.dataValues;
        })
}

async function createNewPost({text}, userId) {
    return await Post.create({text: text, user_id: userId});
}

async function deletePostById(id) {
    return await Post.destroy({where: {id: id}});
}

async function getFriendsPosts(userId, offset = 0, limit = 50) {
    const posts = await sequelize.query(
        // Ситуация аналогична friendsShipDao ->
        `select id, text, user_id, created_at, updated_at   from post inner join 
   (select requester as friend_id from  friends_ship where ( ${userId} = friends_ship.responser) and status = 1) as a on post.user_id = a.friend_id 
   UNION
   select id, text, user_id, created_at, updated_at from post inner join 
   (select responser as friend_id from  friends_ship where ( ${userId} = friends_ship.requester) and status = 1) as a on post.user_id = a.friend_id 
   order by updated_at
   limit ${offset}, ${limit}`,
        {type: sequelize.QueryTypes.SELECT});


    return posts;
}

module.exports = {getPostById, getUserPosts, createNewPost, deletePostById, getFriendsPosts};