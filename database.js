const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

/* Establishing the mysql database connection on localhost 
Enter your own user name and password to setup here. I'm using env variables to maintain sensitive info. 
The authentication method on mysql should be set to 'Standard' or use mysql version 5 
The database 'user-login should have already been created on the server */
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    insecureAuth: true,
});

exports.database = db;
exports.connectDb = (db) => {
    db.connect((err) => {
        if (err) console.log(err);
        else console.log("Connection to database user-login successfully established!");
    });
};
