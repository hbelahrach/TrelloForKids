var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/users");

module.exports = function(passport) {
    passport.use(
        "local",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
                session: true,
                passReqToCallback: true
            },
            (req, email, password, done) => {
                User.findOne({ email: email }, (err, user) => {
                    if (err) return done(err);
                    if (user) {
                        return done(null, {
                            user: user,
                            email: email,
                            password: password
                        });
                    } else {
                        return done(null, {
                            email: email,
                            password: password
                        });
                    }
                });
            }
        )
    );
};
