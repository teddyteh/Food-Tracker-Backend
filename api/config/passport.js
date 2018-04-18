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

                        console.log("profile is " + JSON.stringify(profile));

                        if (profile.name && profile.name.givenName)
                            first_name = profile.name.givenName;
                        if (profile.name && profile.name.familyName)
                            last_name = profile.name.familyName;
                        if (profile.id)
                            email = profile.id; // store facebook account id because it doesn't change
                        if (profile.photos && profile.photos[0])
                            picture = profile.photos[0].value;

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
                        db.UserProfile.findOne({where: {id: user.get('user_profile_id')}})
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
            db.GoogleAccount.findOrCreate({
                where: {
                    google_id: profile.id
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
                        if (profile.emails && profile.emails[0])
                            email = profile.emails[0].value;
                        if (profile.photos && profile.photos[0])
                            picture = profile.photos[0].value;

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
                        db.UserProfile.findOne({where: {id: user.get('user_profile_id')}})
                            .then(function (userProfile) {
                                console.log("User found " + JSON.stringify(userProfile.toJSON()));
                                return cb(null, userProfile.toJSON());
                            })

                    }
                })
        }
    ));

    // Register Local Passport strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, username, password, cb) {
            console.log("email is " + username);

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
                                console.log("id is " + localAccount.get('user_profile_id'));
                                db.UserProfile.findOne({where: {id: localAccount.get('user_profile_id')}})
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
                .catch(function (error) {
                    console.log(error);
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