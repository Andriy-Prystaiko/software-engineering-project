// Bring in our express module
const express = require("express");
// Bring in the path module
const path = require('path');
const cookieParser = require('cookie-parser');

global.document = {
    execCommand() {}
};

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
    // Create an objects for the initial display items
    var cityDisplayText = new City(null);

    // Initialize a list to store all the dictionary values from 'results'
    var cityList = [];
    // Initialize lists that will be dependent on the value of the cityInput
    var continentList = [];
    var regionList = [];
    var countryList = [];
    var districtList = [];

    // Call upon the allCityNames() function to receive a list of all cities
    await cityDisplayText.allCityNames();
    // Initialize a variable to store all city names
    var cityDisplayList = cityDisplayText.data;
    // Add all cities within the cityList
    for (var cities of cityDisplayList) {
        cityList.push(cities["Name"]);
    }

    // Call upon the allContinentsGrouped() function to receive a list of all 
    // grouped continents 
    await cityDisplayText.allContinentsGrouped();
    // Initialize a variable to store all grouped continents
    var continentDisplayList = cityDisplayText.data;
    // Add all grouped continents within the continentList
    for (var continent of continentDisplayList) {
        continentList.push(continent["Continent"]);
    }

    // Call upon the allRegionsGrouped() function to receive a list of all
    // grouped regions
    await cityDisplayText.allRegionsGrouped();
    // Initialize a variable to store all grouped regions
    var regionDisplayList = cityDisplayText.data;
    // Add all grouped regions within the regionList
    for (var region of regionDisplayList) {
        regionList.push(region["Region"]);
    }

    // Call upon the allCountries() function to receive a list of all countries
    await cityDisplayText.allCountries();
    // Initialize a variable to store all countries
    var countryDisplayList = cityDisplayText.data;
    // Add all the countries within the countryList
    for (var country of countryDisplayList) {
        countryList.push(country["Country"]);
    }

    // Call upon the allCountries() function to receive a list of all countries
    await cityDisplayText.allDistrictsGrouped();
    // Initialize a variable to store all countries
    var districtDisplayList = cityDisplayText.data;
    // Add all the countries within the countryList
    for (var district of districtDisplayList) {
        districtList.push(district["District"]);
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

    var userInput = activeCityResponse(cityInput, continentInput, 
        regionInput, countryInput, districtInput);

    // Create an object for the city table data
    var city = new City(userInput);

    //if (userInput == false) {
        //await city.selectAllCities();
    //}
    
    if (userInput == cityInput) {
        if (cityInput == "Select All") {
            await city.selectAllCities();
        } else {
            await city.selectSpecificCity();
        }
    } else if (userInput == continentInput) {
        await city.selectContinents();
    } else if (userInput == districtInput) {
        await city.selectDistricts();
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

    // After setting the cookie, redirect to the 'country-report' endpoint
    res.redirect('/city');
});

// Start the server on Port 3000...
app.listen(3000, function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});