var config = require('./api/config/index'),
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
    servingsController = require('./api/controllers/servingsController.js'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken');

var app = express();

require('./api/config/passport')(app, passport, db, config);
require('./api/config/express')(app, express, passport, config);

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// Route middleware to verify a token
router.use(function (req, res, next) {
    // Decode token
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.secret, function (err, decode) {
            if (err)
                req.user = undefined;

            req.user = decode;

            console.log("user " + req.user);

            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

// Check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).json({ message: "Unauthorized." });
    }
}

function createToken(req) {
    var payload = {
        id: req.user.id
    };

    var token = jwt.sign(payload, config.secret, {
        expiresIn : 60*60*24
    });

    console.log("token " + token);

    return token;
}

// Test route
router.get('/', isLoggedIn, function (req, res) {
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
            return createToken(req);
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
            // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
            res.redirect('OAuthLogin://login?token=' + createToken(req));
            // return res.json({ message: "facebook" });
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
            res.redirect('OAuthLogin://login?token=' + createToken(req));
        } else {
            return res.status(401).json({message: 'Unauthorized user.'});
        }
    })

/**
 * @api {get} /nutrients Get all nutrients
 * @apiName Get all nutrients
 * @apiGroup Nutrient
 */
router.route('/nutrients')
    .post(nutrientsController.getNutrients);

/**
 * @api {get} /servingSizes Get all serving sizes
 * @apiName Get all serving sizes
 * @apiGroup ServingSizes
 */
router.route('/servingSizes')
    .post(servingsController.getServingSizes);

/**
 * @api {post} /addFood Add or update a food
 * @apiName Add food
 * @apiGroup Food
 * @apiParam {String} localId
 * @apiParam {String} name
 * @apiParam {String} description
 * @apiParam {String} calories
 * @apiParam {Object[]} nutrients array of existing Nutrient objects
 * @apiParam {String} servingSizes array of existing ServingSize objects
 */
router.route('/addOrUpdateFood')
    .post(isLoggedIn, foodsController.addOrUpdateFood);

/**
 * @api {get} /food Get list of food
 * @apiName Get list of food
 * @apiGroup Food
 * @apiParam {Integer} pageNumber
 */
router.route('/food')
    .get(isLoggedIn, foodsController.getFood);

/**
 * @api {post} /addEntries Add entries for a user
 * @apiName Add entries
 * @apiGroup Entry
 * @apiParam {Object[]} entries
 * @apiParam {Object[]} entries.food
 * @apiParam {Integer} entries.food.local_id
 * @apiParam {Integer} entries.food.online_id
 * @apiParam {Integer} entries.servingSize
 * @apiParam {Integer} entries.quantity
 * {"food":{"local_id":1,"online_id":1},"servingSize":2,"quantity":1}
 */
router.route('/addEntries')
    .post(isLoggedIn, entriesController.addEntries);

/**
 * @api {get} /entries Get entries for a user
 * @apiName Get entries
 * @apiGroup Entry
 */
router.route('/entries')
    .post(isLoggedIn, entriesController.getUserEntries);

/**
 * @api {get} /weights Get weights for a user
 * @apiName Get weights
 * @apiGroup Weight
 */
router.route('/weights')
    .get(isLoggedIn, weightsController.getUserWeights);

/**
 * @api {post} /addWeight Add weight for a user
 * @apiName Add weight
 * @apiGroup Weight
 * @apiParam {Float} weight
 */
router.route('/addWeight')
    .post(isLoggedIn, weightsController.addWeight);

/**
 * @api {post} /addNutrient Add nutrient
 * @apiName Add nutrient
 * @apiGroup Nutrient
 * @apiParam {String} name
 */
router.route('/addNutrient')
    .post(isLoggedIn, nutrientsController.addNutrient);

/**
 * @api {get} /foodNutrient Get nutrients for a food
 * @apiName Get nutrients for a food
 * @apiGroup FoodNutrient
 * @apiParam {Integer} food
 */
router.route('/foodNutrient')
    .post(isLoggedIn, nutrientsController.getNutrientsForFood);

/**
 * @api {post} /addFoodNutrient Add nutrient for a food
 * @apiName Add nutrient for a food
 * @apiGroup FoodNutrient
 * @apiParam {Integer} food
 * @apiParam {Integer} nutrient
 * @apiParam {Float} amount
 */
router.route('/addFoodNutrient')
    .post(isLoggedIn, nutrientsController.addNutrientForFood);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

db.sequelize.sync({force: config.force})
    .then(startApp)
    .catch(function (e) {
        throw new Error(e);
    });

function startApp() {
    if (config.force) {
        db.Nutrient.bulkCreate([
            { name: 'Carbs' },
            { name: 'Protein' },
            { name: 'Fat' },
        ])

        db.ServingSize.bulkCreate([
            { name: 'cup', amount: 17.5 },
            { name: 'slice', amount: 25 }
        ])
    }
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