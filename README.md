# Full fledged nodejs - mysql - passport authentication app

A website that displays some information about my favorite CS:GO team - **Astralis**. The user may register and login to access the team details and a comments section which is updated using AJAX. All of the information about the users and comments
will be persisted inside a _mysql_ database.

Other code features -

-   Tried to adopt an MVC approach for cleaner code
-   Protected routes
-   Hashed passwords in the database
-   Form validations with error alerts
-   User authentication
-   Environment Variables to hold sensitive data
-   Bootstrap for uniform styling
-   Live AJAX functionality in the _Comments Section_

Packages used -

-   **bcryptjs** - to hash the passwords
-   **dotenv** - to configure environment variables
-   **express** - to configure routes
-   **express-session** - used in conjunction with connect-flash
-   **connect-flash** - to enable passing flash messages between page redirects
-   **hbs** - view engine for this app
-   **passport** - for authentication
-   **passport-local** - to use local strategy with passport.js
-   **mysql** - to use mysql database with the app

## Instructions to run the website:

[LIVE DEMO VIDEO here](https://drive.google.com/drive/folders/1i1mDaouQ2OIsPucfIyjGwI2liaoNi8MH?usp=sharing)

Prerequisites: _nodejs (with npm)_ and _mysql_

-   Download the source code from github into a local folder
-   Navigate to the folder from command line and run **npm install**
-   Open mySQL and create the required database and tables for the app as shown in the live demo video
-   Run **node app.js** from the terminal to get the app running
-   Type **http://localhost:5000** in the browser to access the website
