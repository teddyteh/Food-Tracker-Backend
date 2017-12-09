var jwt = require('jsonwebtoken'),
    userRepo = require('../data/usersRepository'),
    bcrypt = require('bcrypt');;

function register(req, res) {
    var user = req.body.user;

    if (user) {
        userRepo.register(user, function (newUser) {
            if (newUser) {
                console.log("[NEW ACCOUNT] " + newUser.first_name + " " + newUser.last_name + " has registered");
                return res.json({
                    success: true
                });
            } else {
                return res.json({
                    message: "Error registering user."
                });
            }
        });
    }
}

function login(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    if (email && password) {
        userRepo.findByEmail(email)
            .then(function (user) {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        return res.json({
                            token: jwt.sign({
                                id: user.id,
                                email: user.email
                            }, 'secret', {
                                expiresIn: '1h'
                            }),
                            success: true
                        });
                    } else {
                        // Wrong password
                        return res.status(401).json({
                            message: "Authentication failed. Incorrect login details."
                        });
                    }
                } else {
                    // User doesn't exist
                    return res.status(401).json({
                        message: "Authentication failed. User doesn't exist."
                    });
                }
            })
    }
}

function getUser(req, res) {
    var email = req.query.email;

    userRepo.findByEmail(email)
        .then(function (users) {
            if (users.length) {
                return res.json(user);
            }
            return res.json({
                message: "Could not find user."
            });
        })
        .catch(function (error) {
            return res.json({
                message: "Error retrieving user."
            });
        });
}

module.exports = {
    register: register,
    login: login,
    get: getUser
};