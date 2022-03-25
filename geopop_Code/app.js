'use strict';

// Bring in our express module.
const express = require('express');
// Bring in the path module.
const path = require('path');

// Assign a variable to the express function.
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
// Define view engine as PUG
app.set('view engine', 'pug');

// Use a get request to the HOME page.
app.get('/', function(req, res){
    // Send the 'index' view to the browser.
    res.render("index");
});

// Start the server on Port 3000...
app.listen(3000, function(){
    console.log("Server started on port 3000...")
});