// Get the functions in the db.js file to use
const db = require('./../services/db');

class Country {
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
        rowDict["Code"] = '';
        rowDict["Country"] = '';
        rowDict["Continent"] = '';
        rowDict["Region"] = '';
        rowDict["Population"] = '';
        rowDict["Capital"] = '';
        // For each iteration, add the new rowDict into the data array
        this.data.push(rowDict);
    }

    // Create a function to receive Country code, name, continent, region, population, and capital
    async selectAllCountries() {
        // Construct a query to receive the City name, country, district and population from the database
        var sql = "SELECT country.Code AS Code, country.Name AS Country, country.Continent AS \
        Continent, country.Region AS Region, country.Population AS Population, \
        country.Capital AS Capital FROM country \
        ORDER BY country.Population DESC";
        // Receive the results and store them inside a variable
        const results = await db.query(sql);
    
        // Store all the countries data within the data list
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Code"] = row.Code;
            rowDict["Country"] = row.Country;
            rowDict["Continent"] = row.Continent;
            rowDict["Region"] = row.Region;
            rowDict["Population"] = row.Population;
            rowDict["Capital"] = row.Capital;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    // Create a function to receive Country code, name, continent, region, population, and capital
    // of a specific country selected
    async selectSpecificCountry() {
        // Construct a query to receive the City name, country, district and population from the database
        var sql = "SELECT country.Code AS Code, country.Name AS Country, country.Continent AS \
        Continent, country.Region AS Region, country.Population AS Population, country.Capital \
        AS Capital FROM country WHERE country.Name = ? \
        ORDER BY country.Population DESC";
        // Receive the results and store them inside a variable
        const results = await db.query(sql, [this.response]);
    
        // Store all the country data within the data list
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Code"] = row.Code;
            rowDict["Country"] = row.Country;
            rowDict["Continent"] = row.Continent;
            rowDict["Region"] = row.Region;
            rowDict["Population"] = row.Population;
            rowDict["Capital"] = row.Capital;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    // Create a function to receive Country code, name, continent, region, population, and capital
    // of a specific continent selected
    async selectCountriesFromContinent() {
        // Construct a query to receive the City name, country, district and population from the database
        var sql = "SELECT country.Code AS Code, country.Name AS Country, country.Continent AS \
        Continent, country.Region AS Region, country.Population AS Population, country.Capital \
        AS Capital FROM country WHERE country.Continent = ? \
        ORDER BY country.Population DESC";
        // Receive the results and store them inside a variable
        const results = await db.query(sql, [this.response]);
    
        // Store all country data within the data list
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Code"] = row.Code;
            rowDict["Country"] = row.Country;
            rowDict["Continent"] = row.Continent;
            rowDict["Region"] = row.Region;
            rowDict["Population"] = row.Population;
            rowDict["Capital"] = row.Capital;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    // Create a function to receive Country code, name, continent, region, population, and capital
    // of a specific region selected
    async selectCountriesFromRegion() {
        // Construct a query to receive the City name, country, district and population from the database
        var sql = "SELECT country.Code AS Code, country.Name AS Country, country.Continent AS \
        Continent, country.Region AS Region, country.Population AS Population, country.Capital \
        AS Capital FROM country WHERE country.Region = ? \
        ORDER BY country.Population DESC";
        // Receive the results and store them inside a variable
        const results = await db.query(sql, [this.response]);
    
        // Store all country data within the data list
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Code"] = row.Code;
            rowDict["Country"] = row.Country;
            rowDict["Continent"] = row.Continent;
            rowDict["Region"] = row.Region;
            rowDict["Population"] = row.Population;
            rowDict["Capital"] = row.Capital;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }
}

module.exports = {
    Country,
}