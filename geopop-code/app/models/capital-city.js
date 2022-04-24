// Get the functions in the db.js file to use
const db = require('./../services/db');

class CapitalCity {
    // Store all values within an array
    data = []
    // The User Choice Response
    response;

    // Set the Country Name as the constructor
    constructor(response) {
        this.response = response;
    }

    // Create a function that satisfies the 'All-Empty-Inputs' condition
    async emptyResponse() {
        var rowDict = {};
        rowDict["CapitalCity"] = '';
        rowDict["Country"] = '';
        rowDict["Population"] = '';
        // For each iteration, add the new rowDict into the data array
        this.data.push(rowDict);
    }

    // Create a function to receive Capital City name, country and population
    async selectAllCapitalCities() {
        // Construct a query to receive the City name, country, district and population from the database
        var sql = "SELECT city.Name AS CapitalCity, country.Name AS Country, city.Population AS Population \
        FROM city, country WHERE city.ID = country.Capital ORDER BY city.Population DESC";
        // Receive the results and store them inside a variable
        const results = await db.query(sql);
    
        // Store all the countries data within the data list
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["CapitalCity"] = row.CapitalCity;
            rowDict["Country"] = row.Country;
            rowDict["Population"] = row.Population;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    // Create a function to receive Country code, name, continent, region, population, and capital
    // of a specific country selected
    async selectSpecificCapitalCity() {
        // Construct a query to receive the City name, country, district and population from the database
        var sql = "SELECT city.Name AS CapitalCity, country.Name AS Country, city.Population AS Population \
        FROM city, country WHERE city.ID = country.Capital AND city.Name = ? \
        ORDER BY city.Population DESC";
        // Receive the results and store them inside a variable
        const results = await db.query(sql, [this.response]);
    
        // Store all the country data within the data list
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["CapitalCity"] = row.CapitalCity;
            rowDict["Country"] = row.Country;
            rowDict["Population"] = row.Population;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    // Create a function to receive Country code, name, continent, region, population, and capital
    // of a specific continent selected
    async selectCapitalCitiesFromContinent() {
        // Construct a query to receive the City name, country, district and population from the database
        var sql = "SELECT city.Name AS CapitalCity, country.Name AS Country, city.Population AS Population \
        FROM city, country WHERE city.ID = country.Capital AND country.Continent = ? \
        ORDER BY city.Population DESC";
        
        // Receive the results and store them inside a variable
        const results = await db.query(sql, [this.response]);
    
        // Store all country data within the data list
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["CapitalCity"] = row.CapitalCity;
            rowDict["Country"] = row.Country;
            rowDict["Population"] = row.Population;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    // Create a function to receive Country code, name, continent, region, population, and capital
    // of a specific region selected
    async selectCapitalCitiesFromRegion() {
        // Construct a query to receive the City name, country, district and population from the database
        var sql = "SELECT city.Name AS CapitalCity, country.Name AS Country, city.Population AS Population \
        FROM city, country WHERE city.ID = country.Capital AND country.Region = ? \
        ORDER BY city.Population DESC";
        // Receive the results and store them inside a variable
        const results = await db.query(sql, [this.response]);
    
        // Store all country data within the data list
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["CapitalCity"] = row.CapitalCity;
            rowDict["Country"] = row.Country;
            rowDict["Population"] = row.Population;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }
}

module.exports = {
    CapitalCity,
}