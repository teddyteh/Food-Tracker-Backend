// const crypto = require('../utilities/crypto');
const bcrypt = require('bcrypt'),
    saltRounds = 10,
    db = require('../models');

var LocalAccountsRepository = {
    register: function (user, callback) {
        if (user && user.username && user.password) {
            var first_name = null,
                last_name = null,
                email = null,
                picture = null,
                height = null;

            if (user.first_name)
                first_name = user.first_name;
            if (user.last_name)
                last_name = user.last_name;
            if (user.email)
                email = user.email;
            if (user.picture)
                picture = user.picture;
            if (user.height)
                height = user.height;

            db.UserProfile.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                picture: picture,
                height: height,
                last_login: new Date()
            })
                .then(function (userProfile) {

                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(user.password, salt, function (err, hash) {

                            db.LocalAccount.create({
                                user_profile_id: userProfile.get('id'),
                                username: user.username,
                                password: hash,
                                password_salt: salt,
                                password_algorithm: 'bcrypt'
                            })
                                .then(function (localAccount) {
                                    callback({localAccount: localAccount, success: true});
                                })
                                .catch(function (error) {
                                    callback({error: error, success: false});
                                })

                        });
                    });

                })
                .catch(function (error) {
                    callback({error: error, success: false});
                })
        }
    },

    findByEmail: function (email) {
        return db.UserProfile.find({
            where: {
                email: email
            }
        });
    }
}

module.exports = LocalAccountsRepository;