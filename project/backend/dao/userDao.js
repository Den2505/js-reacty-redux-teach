`use strict`;

const {
    User,
    sequelizePromise
} = require(`./models/index`);

const cripto = require(`crypto-js`);



async function userAdd({firstName, secondName, email, hash}) {
   const user = arguments[0];
    sequelizePromise.then(async () => {
        await User.create({
            first_name: firstName,
            second_name: secondName,
            email: email,
            hash: hash /*cripto.MD5(email + password).toString()*/
        });
    });
}

async function getAllUsers() {
    return sequelizePromise.then(async () => {
        const users = await User.findAll();
        return users;
    });
}

async function getUserById(id) {
    return sequelizePromise.then(async () => {
        const user = await User.findOne({where: {id: id}});
        return user;
    });
}

async function deleteUser(id) {
    sequelizePromise
        .then(async () => {
       await User.destroy({where: {id:id}});
    })


}

module.exports = {userAdd, getAllUsers, getUserById, deleteUser};