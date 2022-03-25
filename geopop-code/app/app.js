// Bring in our express module.
const express = require("express");
// Bring in the path module.
const path = require('path');

// Bring in the cookie-parser module
const cookieParser = require('cookie-parser');

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

// Create a function that determines if an object is empty
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            // Return False if there is/are value(s)
            return false;
    }
    // Return True if there are no values present
    return true;
}

app.get('/country-report', async function(req, res) {
    // Initialize the cookies that hold an object with all 
    // the cookie key-values pairs
    const cookies = req.cookies;
    // Declare a variable to store the 'response' value (name of cookie)
    var countryResponse = cookies['countryResponse'];
    var rankResponse = cookies['rankResponse'];
    // Initialize an object: 'country'
    var country;

    // Determine if the object has no value
    if (isEmpty(countryResponse) == true) {
        // When initally rendering the 'country' page, we
        // will need a blank country object to avoid errors
        countryResponse = '';
        country = new Country(countryResponse);
    } else {
        country = new Country(countryResponse);
        // Get the details that correspond with the inputted country
        await country.getCountryDetails();
    }

    if (isEmpty(rankResponse) == false) {
        country = new Country(rankResponse);
        await country.rankCountryByPopulation();
        //console.log(country);
    }

    // Render the 'country' page and pass country values data
    res.render("country", {country:country});
});

app.post('/received-response', function (req, res) {
    // Get the submitted value from the user
    var params = req.body;
    //var country = new Country(params.country);

    // Set a cookie based on the country text-box input
    res.cookie('countryResponse', params.country);
    res.cookie('rankResponse', params.rank);
    
    // After setting the cookie, redirect to the 'country-report' endpoint
    res.redirect('/country-report');
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