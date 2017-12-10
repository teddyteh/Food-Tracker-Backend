module.exports = function (app, express, config) {
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

  // Serve static files from public folder
  app.use(express.static('public'));

};