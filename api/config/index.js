var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development'; // default to development if NODE_ENV environment variable is not set

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'food-tracker'
        },
        port: 3000,
        db: {
            base: "food_tracker",
            user: "root",
            pass: "Testest!2",
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
        force: true,
        secret: 'ilovefoodtracking',
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
    },

    production: {
        root: rootPath,
        app: {
            name: 'food-tracker'
        },
        port: process.env.PORT, // process.env.PORT lets the port be set by Heroku
        db: {
            base: "food_tracker",
            user: "root",
            pass: "Testest!2",
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
        force: true,
        secret: 'ilovefoodtracking',
        facebook: {
            clientID: '1551657021555940',
            clientSecret: '41c937034b0407d8e6fcd335b5c9e322',
            callbackURL: 'https://food-tracker-.herokuapp.com/api/auth/facebook/callback',
            profileFields: ['id', 'name', 'displayName', 'picture', 'email'],
        },
        google: {
            clientID: '1041270276579-667cgpo6qhp5pbjjhtrunkh6cm61ef5g.apps.googleusercontent.com',
            clientSecret: 'yJUnqyOA8pUF9TCB4acqytuw',
            callbackURL: 'https://food-tracker-.herokuapp.com/api/auth/google/callback',
        }
    }
}

module.exports = config[env];