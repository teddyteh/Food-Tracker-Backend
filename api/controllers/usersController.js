var localAccountsRepo = require('../data/localAccountsRepository');

function register(req, res) {
    var user = req.body.user;

    if (user && user.email && user.password) {
        localAccountsRepo.register(user, function (result) {
            if (result.success) {
                return res.json({
                    user: result.localAccount,
                    success: true
                });
            } else {
                return res.json({
                    message: "Error registering user.",
                    success: false
                });
            }
        });
    } else {
        return res.json({
            message: "User not given.",
            success: false
        });
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
    get: getUser
};