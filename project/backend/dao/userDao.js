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

async function getAllUsers(/*firstName, secondName, email*/) { //todo need to implement a field search
   /* let pattern = {};
    if (firstName) pattern.first_name = firstName;
    if (secondName) pattern.second_name = secondName;
    if (email) pattern.email = email;
    if (Object.keys(pattern).length == 0) {pattern = `true`;}
    else
        pattern = JSON.stringify(pattern).replace('"', "`",true);
       pattern = pattern.replace(':', "=");
        console.log(pattern);*/

    return sequelizePromise.then(async () => {
        //const users = await sequelize.query(`Select * from user where ${pattern.toString()}`,  {type: sequelize.QueryTypes.SELECT});
        const users = await User.findAll({where:{

            }});
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