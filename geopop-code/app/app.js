// Bring in our express module
const express = require("express");
// Bring in the path module
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jsdom = require('jsdom')

var events = require('events');
var eventEmitter = new events.EventEmitter();

const dom = new jsdom.JSDOM("")

const jquery = require('jquery')(dom.window)

// Assign a variable to the express function
var app = express();
app.use(cookieParser());

// Add static files location
app.use(express.static("static"));

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the functions in the db.js file to use
const db = require('./services/db');
app.use(express.urlencoded({ extended: true }));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

// Get the models
const { Country } = require('./models/country');
const { City } = require('./models/city');

// Use a get request to the HOME page.
app.get("/", function(req, res){
    // Send the 'index' view to the browser.
    res.render("index");
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

function activeCityResponse(city, continent, region, country, district) {
    var inputs = [city, continent, region, country, district];
    
    for (var input of inputs) {
        if (!(input == '')) {
            return input;
        }
    }
    return false;
}

app.get("/city", async function(req, res) {
    // Initialize a list to store all the dictionary values from 'results'
    var cityList = [];
    // Initialize lists that will be dependent on the value of the cityInput
    var continentList = [];
    var regionList = [];
    var countryList = [];
    var districtList = [];

    // Get the option list within the City textbox
    var sqlAllCities = "SELECT city.Name AS cityName FROM city";
    const allCities = await db.query(sqlAllCities);
    for (var row of allCities) {
        // For each iteration, add the new elements into the cityList
        cityList.push(row.cityName);
    } 

    // Get the option list items for the Regions textbox
    var sqlAllRegions = "SELECT Region FROM country GROUP BY Region";
    const allRegions = await db.query(sqlAllRegions);
    for (var row of allRegions) {
        regionList.push(row.Region)
    }

    // Get the option list elements within the Continents textbox
    var sqlAllContinents = "SELECT Continent FROM country GROUP BY Continent";
    // Receive the results and store them inside a variable
    const allContinents = await db.query(sqlAllContinents);
    // Store all the continents within the continentList
    for(var row of allContinents) {
        // For each iteration, add the new rowDict into the continentsList
        continentList.push(row.Continent);
    }

    // Get the option list items for the District textbox
    var sqlAllDistricts = "SELECT District FROM city GROUP BY District";
    const allDistricts = await db.query(sqlAllDistricts);
    for (var row of allDistricts) {
        districtList.push(row.District);
    }

    // Get the option list for the Country textbox
    var sqlAllCountries = "SELECT country.Name AS Country \
    FROM country ORDER BY Country ASC";
    const allCountries = await db.query(sqlAllCountries);
    // Store all the countries within the data list
    for(var row of allCountries) {
        // For each iteration, add the new rowDict into the data array
        countryList.push(row.Country);
    }

    // Initialize the cookies that hold an object with all 
    // the cookie key-values pairs
    const cookies = req.cookies;
    // Declare a variable to store the 'response' value (name of cookie)
    var cityInput = cookies['cityCityInput'];
    var continentInput = cookies['continentCityInput'];
    var regionInput = cookies['regionCityInput'];
    var countryInput = cookies['countryCityInput'];
    var districtInput = cookies['districtCityInput'];
    var rankInput = cookies['rankCityInput'];
    
    // Determine which textbox had the submitted input
    var userInput = activeCityResponse(cityInput, continentInput, 
        regionInput, countryInput, districtInput);

    // Create an object for the city table data
    var city = new City(userInput);

    if (userInput == false) {
        await city.emptyResponse();
    }else if (userInput == cityInput && cityInput == "Select All") {
        await city.selectAllCities();
    // If the input was within the City Textbox
    } else if (userInput == cityInput && cityInput != "Select All") {
        await city.selectSpecificCity();
    // If the input was within the Continent Textbox
    } else if (userInput == continentInput) {
        await city.selectContinents();
    // If the input was within the Region Textbox
    } else if (userInput == regionInput) {
        await city.selectRegions();
    // If the input was within the Country Textbox
    } else if (userInput == countryInput) {
        await city.selectCountries();
    // If the input was within the District Textbox
    } else if (userInput == districtInput) {
        await city.selectDistricts();
    } else {
        city = [{}];
    }

    // Edit the city.data based on the input of the Rank Numberbox
    if (isEmpty(rankInput)) {
        rankInput = 0;
    } else {
        // Filter city.data to only include the data within the rank range
        city.data = city.data.filter(function(value, index, arr){
            return index <= rankInput - 1;
        });
    }
    // Render the 'city' page and pass some data into the page
    res.render("city", {city:city, cityList:cityList, continentList:continentList, 
        regionList:regionList, countryList:countryList, districtList:districtList});
});

app.get("/country", async function(req, res) {
    // Initialize the cookies that hold an object with all 
    // the cookie key-values pairs
    const cookies = req.cookies;
    // Declare a variable to store the 'response' value (name of cookie)
    var countryResponse = cookies['countryResponse'];
    var rankResponse = cookies['rankResponse'];
    // Initialize an object: 'country'
    var country;

    // Construct a query to receive all the country names from database
    var sql = "SELECT Name FROM country";
    // Receive the results and store them inside a variable
    const results = await db.query(sql);
    // Initialize a list to store all the dictionary values from 'results'
    var countryList = [];

    // Iterate throughout the 'results' dictionary
    for(var nation of results) {
        // Add the 'Name' of the country (nation) into the countryList
        countryList.push(nation["Name"]);
    }

    // Determine if the object has no value
    if (isEmpty(countryResponse) == true) {
        // When initally rendering the 'country' page, we
        // will need a blank country object to avoid errors
        countryResponse = '';
        country = new Country(countryResponse);
        //await country.getAllInitially();
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

    // Render the 'country' page and pass country values and countryList data
    res.render("country", {country:country, countryList:countryList});
});

app.get("/capital-city", async function(req, res) {
    res.render("capital-city");
});

app.post('/received-response', function (req, res) {
    // Get the submitted value from the user
    var params = req.body;
    //var country = new Country(params.country);

    // Set a cookie based on the country text-box input
    res.cookie('countryResponse', params.country);
    res.cookie('rankResponse', params.rank);
    
    // After setting the cookie, redirect to the 'country-report' endpoint
    res.redirect('/country');
});

app.post('/city-response', function (req, res) {
    // Get the submitted value from the user
    var params = req.body;
    
    // Set a cookie based on each text-box input on the city page
    res.cookie('cityCityInput', params.cityCityInput);
    res.cookie('continentCityInput', params.continentCityInput);
    res.cookie('regionCityInput', params.regionCityInput);
    res.cookie('countryCityInput', params.countryCityInput);
    res.cookie('districtCityInput', params.districtCityInput);
    res.cookie('rankCityInput', params.rankCityInput);

    // After setting the cookie, redirect to the 'country-report' endpoint
    res.redirect('/city');
});

// Start the server on Port 3000...
app.listen(3000, function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});