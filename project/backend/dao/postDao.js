const {
    sequelize,
    sequelizePromise,
    User,
    Post,
    FriendsShip
} = require(`./models/index`);

async function getUserPosts(userId) {
    return  sequelizePromise.then(async () => {
            return  await Post.findAll({where: {user_id: userId}})
                .then((posts) => {
                    return posts;
                });
    });
}

async function getPostById(id) {
    return sequelizePromise.then(async () => {
        return await Post.findOne({where: {id: id}})
            .then((post) => {
                return post.dataValues;
            })

    });

}

async function createNewPost({text}, userId) {
    const post = sequelizePromise.then(async () => {
        return await Post.create({text: text, user_id: userId});
    })
        .then((post) => {
            return post.dataValues;
        });
    // if (user) {
    //     return user.addPosts(post);
    // }

    return post;
}

async function deletePostById(id) {
    return sequelizePromise.then(async () => {
        return await Post.destroy({where: {id: id}});
    });

}

module.exports = {getPostById, getUserPosts, createNewPost, deletePostById};