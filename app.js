const express = require("express");
const path = require("path");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

// Starting the app
const app = express();

// Configuring passport
require("./controllers/passport")(passport);

// Importing and establishing database connection
const dbModule = require("./database");
const db = dbModule.database;
dbModule.connectDb(db);

// defining the directory where we will place our public html, css files
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// Using handlebars as our view engine
app.set("view engine", "hbs");

// defining the middleware to parse the form data from request body as json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session for flash messages
app.use(
    session({
        secret: "mysecret",
        resave: true,
        saveUninitialized: true,
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables for flash messages
app.use(function (req, res, next) {
    res.locals.message = req.flash("message");
    res.locals.error = req.flash("error");
    next();
});

// Setting up the routes
app.use("/", require("./routes/pages"));

// Starting up the server on port 5000
app.listen(5000, () => {
    console.log("Server running on local host at port 5000.");
});
