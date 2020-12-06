const dbModule = require("../database");

const db = dbModule.database;

exports.fetchComments = (req, res) => {
    db.query("SELECT * FROM comments", (err, results) => {
        if (err) throw err;

        // turn the results array into a string and send it back
        let comments = JSON.stringify(results);

        res.end(comments);
    });
};

exports.insertComment = (req, res) => {
    db.query("INSERT INTO comments (userName, comment) VALUES (?,?)", [req.body.name, req.body.message], function (error, results, fields) {
        if (error) throw error;

        res.end("Successfully inserted comment!");
    });
};
