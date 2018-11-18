`use strict`;

module.exports.validate = async function validateUser(user) {
    if(!user){
        throw await new Error("User not defined");
    }
    if(user.email === null || user.firstName === null || user.secondName === null){
        throw await new Error(`Email, name, family fields don\`t be empty`);
    }
     if(user.hash === null) {
         throw await new Error(`MD5 error, repeat request to server`);
     }

};