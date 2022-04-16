// Get the functions in the db.js file to use
const db = require('./../services/db');

class City {
    // Store all values within an array
    data = []
    // The User Choice Response
    response;

    // Set the Country Name as the constructor
    constructor(response) {
        this.response = response;
    }

    async allCityNames() {
        var sql = "SELECT city.Name AS cityName \
        FROM city";
        
        const results = await db.query(sql);

        // Iterate throughout the results (BinaryRow)
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            // Coordinate the respective values with their correct key
            rowDict["Name"] = row.cityName;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    // Create a function to receive all Continents Grouped Together
    async allContinentsGrouped() {
        // Construct a query to receive all the continents from database
        var sql = "SELECT Continent FROM country GROUP BY Continent";
        // Receive the results and store them inside a variable
        const results = await db.query(sql);
        // Store all the continents within the continentList
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Continent"] = row.Continent;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    // Create a function to receive all Regions Grouped Together
    async allRegionsGrouped() {
        // Construct a query to receive all the regions from database
        var sql = "SELECT Region FROM country GROUP BY Region";
        // Receive the results and store them inside a variable
        const results = await db.query(sql);
        // Store all the continents within the data list
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Region"] = row.Region;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    // Create a function to receive all Countries Grouped Together
    async allCountries() {
        // Construct a query to receive all the countries from database
        var sql = "SELECT country.Name AS Country FROM country ORDER BY Country ASC";
        // Receive the results and store them inside a variable
        const results = await db.query(sql);
        // Store all the countries within the data list
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Country"] = row.Country;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    // Create a function to receive all Districts Grouped Together
    async allDistrictsGrouped() {
        // Construct a query to receive all the grouped districts from the database
        var sql = "SELECT District FROM city GROUP BY District";
        // Receive the results and store them inside a variable
        const results = await db.query(sql);
        // Store all the districts within the data list
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["District"] = row.District;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    // Create a function to receive City name, country, district, and population
    async selectAllCities() {
        // Construct a query to receive the City name, country, district and population from the database
        var sql = "SELECT city.Name AS Name, country.Name AS Country, \
        city.District AS District, city.Population AS Population FROM city, country \
        WHERE city.CountryCode = country.Code ORDER BY Population DESC";
        // Receive the results and store them inside a variable
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
        WHERE city.CountryCode = country.Code AND city.Name = ?";
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
        WHERE city.CountryCode = country.Code AND country.Continent = ? \
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


}

module.exports = {
    City,
}