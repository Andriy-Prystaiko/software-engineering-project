// Get the functions in the db.js file to use
const db = require('./../services/db');

class City {
    // Store all values within an array
    data = [];
    // The User Choice Response
    response;

    //rank;
    
    // Set the Country Name as the constructor
    constructor(response) {
        this.response = response;
        // this.rank = rank
    }

    // Create a function to receive City name, country, district, and population
    async selectAllCities() {
        // Construct a query to receive the City name, country, district and population from the database
        var sql = "SELECT city.Name AS Name, country.Name AS Country, \
        city.District AS District, city.Population AS Population FROM city, country \
        WHERE city.CountryCode = country.Code ORDER BY Population DESC";
        // Receive the results and store them inside a variable
        //const results = await db.query(sql, [this.rank]);
        const results = await db.query(sql);
    
        // Store all the districts within the data list
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Name"] = row.Name;
            rowDict["Country"] = row.Country;
            rowDict["District"] = row.District;
            rowDict["Population"] = row.Population;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    // Create a function to receive City name, country, district, and population
    async selectSpecificCity() {
        // Construct a query to receive the City name, country, district and population from the database
        var sql = "SELECT city.Name AS Name, country.Name AS Country, \
        city.District AS District, city.Population AS Population FROM city, country \
        WHERE city.CountryCode = country.Code AND city.Name = ? \
        ORDER BY city.Population DESC";
        // Receive the results and store them inside a variable
        const results = await db.query(sql, [this.response]);
        // Store all the districts within the data list
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Name"] = row.Name;
            rowDict["Country"] = row.Country;
            rowDict["District"] = row.District;
            rowDict["Population"] = row.Population;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    async selectContinents() {
        // Construct a query to receive the City name, country, district and population from the database
        var sql = "SELECT city.Name AS Name, country.Name AS Country, city.District AS District, \
        city.Population AS Population FROM city, country \
        WHERE city.CountryCode = country.Code \
        AND country.Continent = ? ORDER BY city.Population DESC";
        // Receive the results and store them inside a variable
        const results = await db.query(sql, [this.response]);
        // Store all the districts within the data list
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Name"] = row.Name;
            rowDict["Country"] = row.Country;
            rowDict["District"] = row.District;
            rowDict["Population"] = row.Population;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    async selectRegions() {
        var sql = "SELECT city.Name AS Name, country.Name AS Country, city.District AS District, \
        city.Population AS Population FROM city, country \
        WHERE city.CountryCode = country.Code AND country.Region = ? \
        ORDER BY city.Population DESC";
        // Receive the results and store them inside a variable
        const results = await db.query(sql, [this.response]);
        // Store all the districts within the data list
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Name"] = row.Name;
            rowDict["Country"] = row.Country;
            rowDict["District"] = row.District;
            rowDict["Population"] = row.Population;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    async selectCountries() {
        // Construct a query to receive the City name, country, district and population from the database
        var sql = "SELECT city.Name AS Name, country.Name AS Country, city.District AS District, \
        city.Population AS Population FROM city, country \
        WHERE city.CountryCode = country.Code AND country.Name = ? \
        ORDER BY city.Population DESC";
        // Receive the results and store them inside a variable
        const results = await db.query(sql, [this.response]);
        // Store all the districts within the data list
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Name"] = row.Name;
            rowDict["Country"] = row.Country;
            rowDict["District"] = row.District;
            rowDict["Population"] = row.Population;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    async selectDistricts() {
        // Construct a query to receive the City name, country, district and population from the database
        var sql = "SELECT city.Name AS Name, country.Name AS Country, city.District AS District, \
        city.Population AS Population FROM city, country \
        WHERE city.CountryCode = country.Code AND city.District = ? \
        ORDER BY city.Population DESC";
        // Receive the results and store them inside a variable
        const results = await db.query(sql, [this.response]);
        // Store all the districts within the data list
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Name"] = row.Name;
            rowDict["Country"] = row.Country;
            rowDict["District"] = row.District;
            rowDict["Population"] = row.Population;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    async emptyResponse() {
        this.data = [];
    }
}

module.exports = {
    City,
}