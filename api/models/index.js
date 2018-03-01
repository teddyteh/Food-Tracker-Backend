var fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize'),
    config = require('../config/index'),
    db = {};

// var sequelize = new Sequelize(config.db.base, config.db.user, config.db.pass, config.db.options);
var sequelize = require('sequelize-heroku').connect();

fs.readdirSync(__dirname).filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
// db.Sequelize = Sequelize;
db.Sequelize = sequelize;

module.exports = db;