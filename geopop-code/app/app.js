// Bring in our express module.
const express = require("express");
// Bring in the path module.
const path = require('path');

// Assign a variable to the express function.
//const app = express();
var app = express();

// Add static files location
//app.use(express.static("static"));

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the functions in the db.js file to use
const db = require('./services/db');

// Use a get request to the HOME page.
app.get("/", function(req, res){
    // Send the 'index' view to the browser.
    res.render("index");
});

// Start the server on Port 3000...
app.listen(3000, function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});