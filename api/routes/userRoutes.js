module.exports = function (app) {
    var user = require('../controllers/userController');

    app.route('/register')
        .get(user.register);
};