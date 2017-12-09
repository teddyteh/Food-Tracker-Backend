var express = require('express'),
    config = require('./api/config/config'),
    db = require('./api/models'),
    mainController = require('./api/controllers/mainController.js'),
    usersController = require('./api/controllers/usersController.js'),
    bodyParser = require('body-parser'),
    jsonWebToken = require('jsonwebtoken');

var app = express();

require('./api/config/express')(app, config);

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    console.log('Something is happening.');

    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonWebToken.verify(req.headers.authorization.split(' ')[1], 'secret', function (err, decode) {
            if (err)
                req.user = undefined;

            req.user = decode;

            // console.log(req.user);

            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({
        message: 'Welcome to our api!'
    });
});

// more routes for our API will happen here
router.route('/register')
    .post(usersController.register);

router.route('/login')
    .post(usersController.login);

router.route('/test')
    .get(mainController.loginRequired, mainController.test);

// router.route('/users')
//     // create a bear (accessed at POST http://localhost:8080/api/bears)
//     .get(function (req, res) {

//         db.User.create({
//                 first_name: "John",
//                 last_name: "Doe",
//                 email: "test@email.com",
//                 password: "password"
//             })
//             .then(user => {
//                 res.json(user);
//             });

//     });

// router.route('/users/:user_id')
//     // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
//     .get(function (req, res) {

//         db.User.findAll()
//             .then(users => {
//                 res.json({
//                     users: users
//                 })
//             })

//     });

// router.route('/weights/:user_id')
//     // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
//     .get(function (req, res) {

//         db.Weight.findAll()
//             .then(weights => {
//                 res.json({
//                     weights: weights
//                 })
//             })

//     });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

db.sequelize.sync()
    .then(startApp)
    .catch(function (e) {
        throw new Error(e);
    });

function startApp() {
    // START THE SERVER
    // =============================================================================
    app.listen(config.port, function () {
        console.log('Magic happens on port ' + config.port);
    });
}