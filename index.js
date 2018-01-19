var config = require('./api/config/config'),
    db = require('./api/models'),
    passport = require('passport'),
    express = require('express'),
    figlet = require('figlet'),

    mainController = require('./api/controllers/mainController.js'),
    usersController = require('./api/controllers/usersController.js'),
    weightsController = require('./api/controllers/weightsController.js'),
    foodsController = require('./api/controllers/foodsController.js'),
    entriesController = require('./api/controllers/entriesController.js'),
    nutrientsController = require('./api/controllers/nutrientsController.js'),
    bodyParser = require('body-parser'),
    jsonWebToken = require('jsonwebtoken');

var app = express();

require('./api/config/passport')(app, passport, db, config);
require('./api/config/express')(app, express, passport, config);

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
// router.use(function (req, res, next) {
//     console.log('Something is happening.');
//
//     if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
//         jsonWebToken.verify(req.headers.authorization.split(' ')[1], 'secret', function (err, decode) {
//             if (err)
//                 req.user = undefined;
//
//             req.user = decode;
//
//             // console.log(req.user);
//
//             next();
//         });
//     } else {
//         req.user = undefined;
//         next();
//     }
// });

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.json({ message: "Unauthorized." });
}

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({
        message: 'Welcome to our api!'
    });
});

// more routes for our API will happen here
/**
 * @api {post} /auth/register Register a local account
 * @apiName Register
 * @apiGroup Auth
 * @apiParam {Object[]} user
 * @apiParam {String} user.username Required
 * @apiParam {String} user.password Required
 * @apiParam {String} user.first_name
 * @apiParam {String} user.last_name
 * @apiParam {String} user.email
 * @apiParam {String} user.picture
 * @apiParam {String} user.height
 */
router.route('/auth/register')
    .post(usersController.register);

/**
 * @api {post} /auth/login Login a local user
 * @apiName Login
 * @apiGroup Auth
 * @apiParam {String} user.username
 * @apiParam {String} user.password
 */
router.route('/auth/login')
    .post(passport.authenticate('local'), function (req, res, next) {
        if (req.user) {
            // console.log(req.user);
            return res.json({ message: "local" });
        } else {
            return res.status(401).json({message: 'Unauthorized user.'});
        }
    });

/**
 * @api {get} /auth/facebook Login with Facebook
 * @apiName Login with Facebook
 * @apiGroup Auth
 */
router.route('/auth/facebook')
    .get(passport.authenticate('facebook'));

router.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', {failureRedirect: '/api/auth/facebook'}), function (req, res, next) {
        if (req.user) {
            return res.json({ message: "facebook" });
        } else {
            return res.status(401).json({message: 'Unauthorized user.'});
        }
    })

/**
 * @api {get} /auth/google Login with Google
 * @apiName Login with Google
 * @apiGroup Auth
 */
router.route('/auth/google')
    .get(passport.authenticate('google', { scope: ['profile'] }));

router.route('/auth/google/callback')
    .get(passport.authenticate('google', {failureRedirect: '/api/auth/google'}), function (req, res, next) {
        if (req.user) {
            return res.json({ message: "google" });
        } else {
            return res.status(401).json({message: 'Unauthorized user.'});
        }
    })

/**
 * @api {get} /weights Get weights for a user
 * @apiName Get weights
 * @apiGroup Weights
 */
router.route('/weights')
    .get(isLoggedIn, weightsController.getUserWeights);

/**
 * @api {post} /addWeight Add weight for a user
 * @apiName Add weight
 * @apiGroup Weights
 * @apiParam {Float} weight
 */
router.route('/addWeight')
    .post(isLoggedIn, weightsController.addWeight);

/**
 * @api {get} /foods Get foods
 * @apiName Get foods
 * @apiGroup Foods
 * @apiParam {Integer} pageNumber
 */
router.route('/foods')
    .get(isLoggedIn, foodsController.getFoods);

/**
 * @api {post} /addFood Add a food
 * @apiName Add food
 * @apiGroup Foods
 * @apiParam {String} name
 * @apiParam {String} description
 */
router.route('/addFood')
    .post(isLoggedIn, foodsController.addFood);

/**
 * @api {get} /entries Get entries for a user
 * @apiName Get entries
 * @apiGroup Entries
 */
router.route('/entries')
    .post(isLoggedIn, entriesController.getUserEntries);

/**
 * @api {post} /addEntry Add entry for a user
 * @apiName Add entry
 * @apiGroup Entries
 * @apiParam {Integer} food
 * @apiParam {Float} serving
 */
router.route('/addEntry')
    .post(isLoggedIn, entriesController.addEntry);

/**
 * @api {get} /nutrients Get all nutrients
 * @apiName Get all nutrients
 * @apiGroup Nutrients
 */
router.route('/nutrients')
    .post(isLoggedIn, nutrientsController.getNutrients);

/**
 * @api {post} /addNutrient Add nutrient
 * @apiName Add nutrient
 * @apiGroup Nutrients
 * @apiParam {String} name
 */
router.route('/addNutrient')
    .post(isLoggedIn, nutrientsController.addNutrient);

/**
 * @api {get} /foodNutrient Get nutrients for a food
 * @apiName Get nutrients for a food
 * @apiGroup FoodNutrients
 * @apiParam {Integer} food
 */
router.route('/foodNutrient')
    .post(isLoggedIn, nutrientsController.getNutrientsForFood);

/**
 * @api {post} /addFoodNutrient Add nutrient for a food
 * @apiName Add nutrient for a food
 * @apiGroup FoodNutrients
 * @apiParam {Integer} food
 * @apiParam {Integer} nutrient
 * @apiParam {Float} amount
 */
router.route('/addFoodNutrient')
    .post(isLoggedIn, nutrientsController.addNutrientForFood);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

db.sequelize.sync({force: true})
    .then(startApp)
    .catch(function (e) {
        throw new Error(e);
    });

function startApp() {
    // START THE SERVER
    // =============================================================================
    figlet('Food Diary', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        process.stdout.write('\033c');
        console.log(data);
        app.listen(config.port, function () {
            console.log('Magic happens on port ' + config.port);
        });
    });

}