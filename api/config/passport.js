module.exports = function (app, passport, db, config) {

    var FacebookStrategy = require('passport-facebook'),
        GoogleStrategy = require('passport-google-oauth20'),
        LocalStrategy = require('passport-local'),
        bcrypt = require('bcrypt'),
        saltRounds = 10;

    // Register Facebook Passport strategy
    passport.use(new FacebookStrategy(config.facebook,
        function (accessToken, refreshToken, profile, cb) {
            db.FacebookAccount.findOrCreate({
                where: {
                    facebook_id: profile.id
                }
            })
                .spread(function (user, created) {
                    if (created) {
                        var first_name = null,
                            last_name = null,
                            email = null,
                            picture = null;

                        if (profile.name && profile.name.givenName)
                            first_name = profile.name.givenName;
                        if (profile.name && profile.name.familyName)
                            last_name = profile.name.familyName;
                        if (profile.email)
                            email = profile.email;
                        if (profile.picture)
                            picture = profile.picture.data.url;

                        db.UserProfile.create({
                            first_name: first_name,
                            last_name: last_name,
                            email: email,
                            picture: picture,
                            last_login: new Date()
                        })
                            .then(function (userProfile) {
                                user.update({user_profile_id: userProfile.id})
                                    .then(function (success) {
                                        console.log("User added " + JSON.stringify(userProfile.toJSON()));
                                        return cb(null, userProfile.toJSON());
                                    })
                            })

                    } else {
                        // Existing user
                        db.UserProfile.findById(user.get('user_profile_id'))
                            .then(function (userProfile) {
                                console.log("User found " + JSON.stringify(userProfile.toJSON()));
                                return cb(null, userProfile.toJSON());
                            })

                    }
                })
        }
    ));

    // Register Google Passport strategy
    passport.use(new GoogleStrategy(config.google,
        function (accessToken, refreshToken, profile, cb) {
            db.GoogleAccount.find({
                where: {
                    google_id: profile.id
                }
            })
                .then(function (user) {
                    db.UserProfile.findById(user.get('user_profile_id'))
                        .then(function (userProfile) {
                            console.log("User found " + JSON.stringify(userProfile.toJSON()));
                            return cb(null, userProfile.toJSON());
                        })
                })
        }
    ));

    // Register Local Passport strategy
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, username, password, cb) {
            db.LocalAccount.findOne({
                where: {
                    username: username
                }
            })
                .then(function (localAccount) {
                    if (localAccount) {
                        bcrypt.compare(password, localAccount.password, function (err, res) {
                            // Password is correct
                            if (res == true) {
                                db.UserProfile.findById(localAccount.get('user_profile_id'))
                                    .then(function (userProfile) {
                                        return cb(null, userProfile.toJSON());
                                    })
                            } else {
                                return cb(null, null);
                            }
                        });
                    } else {
                        return cb(null, null);
                    }
                })
        }
    ));

    // Serialize user into the sessions
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    // Deserialize user from the sessions
    passport.deserializeUser(function (id, done) {
        done(null, id);
    });
};