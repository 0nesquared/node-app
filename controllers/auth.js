const passport = require("passport");
const bcrypt = require("bcryptjs");
const dbModule = require("../database");

const db = dbModule.database;

// to process registration requests
exports.register = (req, res) => {
    const { name, email, password, passwordConfirm } = req.body;

    db.query("SELECT email FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) console.log(err);
        if (results.length > 0) {
            return res.render("register", { message: "The email you have entered has already been taken.", name });
        } else if (password !== passwordConfirm) {
            return res.render("register", { message: "The passwords do not match!", name, email });
        }

        /* Encrypting the passwords*/
        let hashedPassword = await bcrypt.hash(password, 8);

        /* Inserting user */
        db.query("INSERT INTO users SET ?", { name, email, password: hashedPassword }, (err, results) => {
            if (err) console.log(err);
            else return res.render("register", { message: "User registered. You may now login!" });
        });
    });
};

// to process login requests
exports.login = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        failureFlash: true,
    })(req, res, next);
};

// to process logout requests
exports.logout = (req, res) => {
    req.logout();
    req.flash("message", "You have been logged out.");
    res.redirect("/login");
};

// to check whether the requesting user is logged in or not
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("message", "Please log in to view that resource");
    res.redirect("/login");
};

// to redirect to dashboard for authenticated users whenever they try to access non-authenticated pages
exports.nonAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/dashboard");
};
