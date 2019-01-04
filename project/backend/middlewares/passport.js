const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const {User, sequelizePromise} = require(`../dao/models/index`);


const options = {
    usernameField: 'email',
    passwordField: 'hash'
};

passport.use('local', new LocalStrategy(options, (email, hash, done) => {
    console.log(`passport use block`);
    sequelizePromise.then(async () => {
        return await User.findOne({where: {email: email, hash:hash}})
    })
        .then((user) => {
            console.log(user.dataValues);
            if (user.dataValues) {

                //   if (hash === user.dataValues.hash)
                return done(null, user.dataValues);
            }
            else {
                return done(null, false);
            }
        })
        .catch((err) => {
            return done(null, false, {message: err.message});
        });

}));

passport.serializeUser((user, done) => {
    console.log(`serialize user id ${user.id}`);
    return done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    console.log(`DEserialize user id ${userId}`);
    sequelizePromise.then(async () => {
        return await User.findOne({where: {id: userId}});
    })
        .then((user) => {
            if (user.dataValues) {
                return done(null, user.dataValues);
            }
            else {
                throw new Error(`User with id=${userId} not available`)
            }
        })
        .catch((err) => {
            done(null, false, {message: err.message})
        });

});

module.exports = passport;