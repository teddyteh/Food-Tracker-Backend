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

                define: {
                    underscored: true
                }
            }
        },
        facebook: {
            clientID: '1551657021555940',
            clientSecret: '41c937034b0407d8e6fcd335b5c9e322',
            callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
            profileFields: ['id', 'name', 'displayName', 'picture', 'email'],
        },
        google: {
            clientID: '1041270276579-667cgpo6qhp5pbjjhtrunkh6cm61ef5g.apps.googleusercontent.com',
            clientSecret: 'yJUnqyOA8pUF9TCB4acqytuw',
            callbackURL: 'http://localhost:3000/api/auth/google/callback',
        }
    }
}

module.exports = config[env];