module.exports = function (app, express, passport, config) {
    // BASE SETUP
    // =============================================================================

    // call the packages we need
    var bodyParser = require('body-parser'),
        session = require('express-session')

    // configure app to use bodyParser()
    // this will let us get the data from a POST
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    // Serve static files from public folder
    app.use(express.static('public'));

    app.use(session({secret: 'keyboard cat'}));
    // Initialize Passport
    app.use(passport.initialize());
    app.use(passport.session());

};