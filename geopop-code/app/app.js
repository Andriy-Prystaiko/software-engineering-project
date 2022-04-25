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
const { CapitalCity } = require('./models/capital-city');
const { Population } = require('./models/population');

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

// Create a function that determines which textbox received the 
// active input from the user
function activeCityResponse(inputs) {
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

    // Initialize a list that contains all inputs
    var checkTextboxes = [cityInput, continentInput, 
        regionInput, countryInput, districtInput];
    // Determine which textbox had the submitted input
    var userInput = activeCityResponse(checkTextboxes);
    
    // Set a condition if all inputs were empty
    if (userInput == false) {
        userInput = '';
    }

    // Create an object for the city table data
    var city = new City(userInput);

    try {
        if (userInput == '') {
            await city.emptyResponse();
        } else if (userInput == cityInput && cityInput == "Select All") {
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
            await city.emptyResponse();
        }
    } catch(err) {
        await city.emptyResponse();
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
    // Initialize lists for the select option boxes within the Country Page
    var countryList = [];
    var continentList = [];
    var regionList = [];

    // Get the option list within the Country textbox
    var sqlAllCountries = "SELECT country.Name AS countryName FROM country";
    const allCountries = await db.query(sqlAllCountries);
    for (var row of allCountries) {
        // For each iteration, add the new elements into the cityList
        countryList.push(row.countryName);
    }
    
    // Get the option list within the Continent textbox
    var sqlAllContinents = "SELECT country.Continent AS countryContinent FROM country \
    GROUP BY countryContinent";
    const allContinents = await db.query(sqlAllContinents);
    for (var row of allContinents) {
        continentList.push(row.countryContinent);
    }

    // Get the option list within the Region textbox
    var sqlAllRegions = "SELECT country.Region AS countryRegion FROM country \
    GROUP BY countryRegion";
    const allRegions = await db.query(sqlAllRegions);
    for (var row of allRegions) {
        regionList.push(row.countryRegion);
    }

    // Initialize the cookies that hold an object with all 
    // the cookie key-values pairs
    const cookies = req.cookies;
    // Declare a variable to store the 'response' value (name of cookie)
    var countryInput = cookies['countryCountryInput'];
    var continentInput = cookies['continentCountryInput'];
    var regionInput = cookies['regionCountryInput'];
    var rankInput = cookies['rankCountryInput'];

    // Initialize a list that contains all potential input from textboxes
    var checkTextboxes = [countryInput, continentInput, regionInput];
    // Determine which textbox had the submitted input
    var userInput = activeCityResponse(checkTextboxes);

    // Set a condition if all inputs were empty
    if (userInput == false) {
        userInput = '';
    }

    // Create an object for the Country table data
    var country = new Country(userInput);

    try {
        if (userInput == '') {
            await country.emptyResponse();
        } else if (userInput == countryInput && countryInput == "Select All") {
            await country.selectAllCountries();
        // If the input was within the City Textbox
        } else if (userInput == countryInput && countryInput != "Select All") {
            await country.selectSpecificCountry();
        // If the input was within the Continent Textbox
        } else if (userInput == continentInput) {
            await country.selectCountriesFromContinent();
        // If the input was within the Region Textbox
        } else if (userInput == regionInput) {
            await country.selectCountriesFromRegion();
        } else {
            await country.emptyResponse();
        }
    } catch(err) {
        await country.emptyResponse();
    }
    
    // Edit the city.data based on the input of the Rank Numberbox
    if (isEmpty(rankInput)) {
        rankInput = 0;
    } else {
        // Filter city.data to only include the data within the rank range
        country.data = country.data.filter(function(value, index, arr){
            return index <= rankInput - 1;
        });
    }
    // Render the 'city' page and pass some data into the page
    res.render("country", {country:country, countryList:countryList, 
        continentList:continentList, regionList:regionList});
});

app.get("/capital-city", async function(req, res) {
    // Initialize lists for the select option boxes within the Country Page
    var capCityList = [];
    var continentList = [];
    var regionList = [];

    // Get the option list within the Capital City textbox
    var sqlAllCapCity = "SELECT city.Name AS CapitalCity FROM city, country \
    WHERE city.ID = country.Capital";
    const allCapCities = await db.query(sqlAllCapCity);
    for (var row of allCapCities) {
        // For each iteration, add the new elements into the capCityList
        capCityList.push(row.CapitalCity);
    }

    // Get the option list within the Continent textbox
    var sqlAllContinents = "SELECT country.Continent AS Continent FROM country \
    GROUP BY country.Continent";
    const allContinents = await db.query(sqlAllContinents);
    for (var row of allContinents) {
        // For each iteration, add the new elements into the continentList
        continentList.push(row.Continent);
    }

    // Get the option list within the Region textbox
    var sqlAllRegions = "SELECT country.Region AS Region FROM country \
    GROUP BY country.Region";
    const allRegions = await db.query(sqlAllRegions);
    for (var row of allRegions) {
        // For each iteration, add the new elements into the continentList
        regionList.push(row.Region);
    }

    // Initialize the cookies that hold an object with all 
    // the cookie key-values pairs
    const cookies = req.cookies;
    // Declare a variable to store the 'response' value (name of cookie)
    var capCityInput = cookies['capcityCapCityInput'];
    var continentInput = cookies['continentCapCityInput'];
    var regionInput = cookies['regionCapCityInput'];
    var rankInput = cookies['rankCapCityInput'];

    // Initialize a list that contains all potential input from textboxes
    var checkTextboxes = [capCityInput, continentInput, regionInput];
    // Determine which textbox had the submitted input
    var userInput = activeCityResponse(checkTextboxes);

    // Set a condition if all inputs were empty
    if (userInput == false) {
        userInput = '';
    }

    // Create an object for the city table data
    var capitalCity = new CapitalCity(userInput);

    if (userInput == '') {
        await capitalCity.emptyResponse();
    } else if (userInput == capCityInput && capCityInput == "Select All") {
        await capitalCity.selectAllCapitalCities();
    // If the input was within the Capital City Textbox
    } else if (userInput == capCityInput && capCityInput != "Select All") {
        await capitalCity.selectSpecificCapitalCity();
    // If the input was within the Continent Textbox
    } else if (userInput == continentInput) {
        await capitalCity.selectCapitalCitiesFromContinent();
    // If the input was within the Region Textbox
    } else if (userInput == regionInput) {
        await capitalCity.selectCapitalCitiesFromRegion();
    } else {
        await capitalCity.emptyResponse();
    }

    // Edit the city.data based on the input of the Rank Numberbox
    if (isEmpty(rankInput)) {
        rankInput = 0;
    } else {
        // Filter city.data to only include the data within the rank range
        capitalCity.data = capitalCity.data.filter(function(value, index, arr){
            return index <= rankInput - 1;
        });
    }
    res.render("capital-city", {capitalCity:capitalCity, capCityList:capCityList, 
        continentList:continentList, regionList:regionList});
});

app.get("/population", async function(req, res) {
    // Initialize lists for the select option boxes within the Country Page
    var countryList = [];
    var continentList = [];
    var regionList = [];

    // Get the option list within the Country textbox
    var sqlAllCountries = "SELECT country.Name AS Country FROM country \
    GROUP BY country.Name";
    const allCountries = await db.query(sqlAllCountries);
    for (var row of allCountries) {
        // For each iteration, add the new elements into the countryList
        countryList.push(row.Country);
    }

    // Get the option list within the Continent textbox
    var sqlAllContinents = "SELECT country.Continent AS Continent FROM country \
    GROUP BY country.Continent";
    const allContinents = await db.query(sqlAllContinents);
    for (var row of allContinents) {
        // For each iteration, add the new elements into the continentList
        continentList.push(row.Continent);
    }

    // Get the option list within the Region textbox
    var sqlAllRegions = "SELECT country.Region AS Region FROM country \
    GROUP BY country.Region";
    const allRegions = await db.query(sqlAllRegions);
    for (var row of allRegions) {
        // For each iteration, add the new elements into the continentList
        regionList.push(row.Region);
    }

    // Initialize the cookies that hold an object with all 
    // the cookie key-values pairs
    const cookies = req.cookies;
    // Declare a variable to store the 'response' value (name of cookie)
    var countryInput = cookies['countryPopulationInput'];
    var continentInput = cookies['continentPopulationInput'];
    var regionInput = cookies['regionPopulationInput'];

    // Initialize a list that contains all potential input from textboxes
    var checkTextboxes = [countryInput, continentInput, regionInput];
    // Determine which textbox had the submitted input
    var userInput = activeCityResponse(checkTextboxes);
    // Initialize a variable that indicates the header based on the userInput
    var header = '';

    // Set a condition if all inputs were empty
    if (userInput == false) {
        userInput = '';
    }

    // Create an object for the city table data
    var population = new Population(userInput);
    
    try {
        if (userInput == '') {
            await population.emptyResponse();
        // If the input was within the Country Textbox
        } else if (userInput == countryInput) {
            await population.getCountryPopulationData();
            header = "Country";
        // If the input was within the Region Textbox
        } else if (userInput == regionInput) {
            await population.getRegionPopulationData();
            header = "Region";
        // If the input was within the Continent Textbox
        } else if (userInput == continentInput) {
            await population.getContinentPopulationData();
            header = "Continent";
        } else {
            await population.emptyResponse();
        }
    } catch(err) {
        await population.emptyResponse();
    }
    
    res.render("population", {population:population, header:header, countryList:countryList, 
        continentList:continentList, regionList:regionList});
});

app.post("/population-response", function(req, res) {
    // Get the submitted value from the user
    var params = req.body;

    // Set a cookie based on each text-box input on the Country Page
    res.cookie('countryPopulationInput', params.countryPopulationInput);
    res.cookie('continentPopulationInput', params.continentPopulationInput);
    res.cookie('regionPopulationInput', params.regionPopulationInput);
    
    // After setting the cookie, redirect to the 'population' endpoint
    res.redirect('/population');
});

app.post("/capital-city-response", function(req, res) {
    // Get the submitted value from the user
    var params = req.body;

    // Set a cookie based on each text-box input on the Country Page
    res.cookie('capcityCapCityInput', params.capcityCapCityInput);
    res.cookie('continentCapCityInput', params.continentCapCityInput);
    res.cookie('regionCapCityInput', params.regionCapCityInput);
    res.cookie('rankCapCityInput', params.rankCapCityInput);
    
    // After setting the cookie, redirect to the 'country-report' endpoint
    res.redirect('/capital-city');
});

app.post("/country-response", function(req, res) {
    // Get the submitted value from the user
    var params = req.body;

    // Set a cookie based on each text-box input on the Country Page
    res.cookie('countryCountryInput', params.countryCountryInput);
    res.cookie('continentCountryInput', params.continentCountryInput);
    res.cookie('regionCountryInput', params.regionCountryInput);
    res.cookie('rankCountryInput', params.rankCountryInput);
    
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