var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'food-tracker'
    },
    port: 3000,
    db: {
      database: "food_tracker",
      user: "root",
      password: "Testest!2",
      options: {
        host: 'localhost',
        port: 8887,
        dialect: 'mysql',

        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },

      }
    }
  }
}

module.exports = config[env];