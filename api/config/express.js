module.exports = function (app, config) {
  // BASE SETUP
  // =============================================================================

  // call the packages we need
  var bodyParser = require('body-parser');

  // configure app to use bodyParser()
  // this will let us get the data from a POST
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

};