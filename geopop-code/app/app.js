// Bring in our express module.
const express = require('express');
// Bring in the path module.
const path = require('path');

// Assign a variable to the express function.
var app = express();

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the functions in the db.js file to use
const db = require('./services/db');
app.use(express.urlencoded({ extended: true}));

// Get our models
const { Country } = require('./models/country');

// Use a get request to the HOME page.
app.get('/', function(req, res){
    // Send the 'index' view to the browser.
    res.render('index');
});

app.get('/country-report', function(req, res) {
    // When initally rendering the 'country' page, we
    // will need a blank country object to avoid errors
    var country = new Country('');
    // Render in the country page through the country.pug view
    // Also, enable access to student values within country.pug
    res.render('country', {student:student});
});

app.post('/received-response', async function (req, res) {
    // Get the submitted value from the user
    var userResponse = req.body.country;
    var country = new Country(countryName);
    await country.getCountryDetails();
    // Render in the index page once more along with 'country' values
    res.render('country', {country:country});
});

// Start the server on Port 3000...
app.listen(3000, function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});