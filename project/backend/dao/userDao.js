`use strict`;

const {
    User,
    sequelizePromise,
    // sequelize
} = require(`./models/index`);

/*const cripto = require(`crypto-js`);*/


async function userAdd({firstName, secondName, email, hash}) {
    return sequelizePromise.then(async () => {
        await User.create({
            first_name: firstName,
            second_name: secondName,
            email: email,
            hash: hash /*cripto.MD5(email + password).toString()*/
        });
    })
}

async function getAllUsers(firstName, secondName) {

    if (!firstName && !secondName) {
        firstName = '%';
        secondName = '%';
    }
    else if (firstName && !secondName) {
        firstName = `%${firstName}%`;
        secondName = '%'
    }
    else if (secondName && !firstName) {
        secondName = `%${secondName}%`;
        firstName = '%';
    }
    else {
        if (firstName) {
            firstName = `%${firstName}%`
        }
        if (secondName) {
            secondName = `%${secondName}%`
        }
    }


    return sequelizePromise.then(async () => {
        const users = await User.findAll({
            where: {
                $and: {
                    first_name: {$like: firstName},
                    second_name: {$like: secondName}
                }

            }
        });
        return users;
    });
}

async function getUserById(id) {
    return sequelizePromise.then(async () => {
        const user = await User.findOne({where: {id: id}});
        return user.dataValues;
    });
}

async function deleteUser(id) {
    sequelizePromise
        .then(async () => {
            await User.destroy({where: {id: id}});
        })


}

module.exports = {userAdd, getAllUsers, getUserById, deleteUser};