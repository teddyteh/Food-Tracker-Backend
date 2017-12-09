// const crypto = require('../utilities/crypto');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../models');

var UsersRepository = {
    register: function (user, callback) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(user.password, salt, function (err, hash) {
                user.password = hash;
                user.password_salt = salt;
                user.password_algorithm = 'bcrypt';
                user.last_login = new Date();

                db.User.create(user)
                    .then(function (response) {
                        callback(response);
                    });
            });
        });
    },

    findByEmail: function (email) {
        return db.User.find({
            where: {
                email: email
            }
        });
    }
}

module.exports = UsersRepository;