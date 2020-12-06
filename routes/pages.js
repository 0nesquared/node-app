const express = require("express");
const authController = require("../controllers/auth");
const ajaxController = require("../controllers/ajax");

const router = express.Router();

// Index page of the app
router.get("/", authController.nonAuthenticated, (req, res) => {
    res.render("index");
});

// Registration page
router.get("/register", authController.nonAuthenticated, (req, res) => {
    res.render("register");
});

// Login page
router.get("/login", authController.nonAuthenticated, (req, res) => {
    res.render("login");
});

// Register POST request
router.post("/register", authController.register);

// Login POST request
router.post("/login", authController.login);

// User Dashboard
router.get("/dashboard", authController.isAuthenticated, (req, res) => {
    res.render("dashboard", {
        user: req.user[0],
    });
});

// Comments section
router.get("/comments", authController.isAuthenticated, (req, res) => {
    res.render("comments");
});

// To fetch the comments from the database via ajax call
router.get("/fetchComments", authController.isAuthenticated, ajaxController.fetchComments);

// Insert Comment POST request
router.post("/insertComment", authController.isAuthenticated, ajaxController.insertComment);

// Logout
router.get("/logout", authController.logout);

module.exports = router;
