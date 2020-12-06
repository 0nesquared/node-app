const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Load database connection
const db = require("../database").database;

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            // Match user
            db.query("SELECT * FROM USERS WHERE email = ?", [email], (err, results) => {
                if (err) console.log(err);
                if (results.length < 1) {
                    return done(null, false, { message: "That email hasn't been registered yet!" });
                }

                // Match password
                bcrypt.compare(password, results[0].password, (err, isMatch) => {
                    if (err) console.log(err);
                    if (isMatch) {
                        return done(null, results[0]);
                    } else {
                        return done(null, false, { message: "Password incorrect." });
                    }
                });
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        db.query("SELECT * FROM users WHERE id = ?", [id], (err, user) => {
            done(err, user);
        });
    });
};
