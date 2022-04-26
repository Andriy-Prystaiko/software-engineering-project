// Get the functions in the db.js file to use
const db = require('./../services/db');

class Population {
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
        rowDict["Name"] = '';
        rowDict["TotalPop"] = '';
        rowDict["InCityPop"] = '';
        rowDict["InCityPercent"] = '';
        rowDict["OutCityPop"] = '';
        rowDict["OutCityPercent"] = '';
        // For each iteration, add the new rowDict into the data array
        this.data.push(rowDict);
    }

    async getSpecificCountryPopulationData() {
        // Construct a query to receive the Country name, population, population living 
        // in city an not living in city
        var sql = "SELECT country.Name AS Name, country.Population AS TotalPop, \
        SUM(city.Population) AS InCityPop, ROUND((SUM(city.Population) / country.Population) * 100.0, 2) \
        AS InCityPercent, country.Population - SUM(city.Population) AS OutCityPop, \
        ROUND(((country.Population - SUM(city.Population)) / country.Population) * 100.0, 2) AS OutCityPercent \
        FROM city, country WHERE country.Name = ? AND country.Code = city.CountryCode \
        GROUP BY country.Name, country.Population LIMIT 1";

        // Receive the results and store them inside a variable
        const results = await db.query(sql, [this.response]);
        
        for (var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Name"] = row.Name;
            rowDict["TotalPop"] = row.TotalPop;
            rowDict["InCityPop"] = row.InCityPop;
            rowDict["InCityPercent"] = row.InCityPercent;
            rowDict["OutCityPop"] = row.OutCityPop;
            rowDict["OutCityPercent"] = row.OutCityPercent;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    async getSpecificRegionPopulationData() {
        // Construct a query to receive the Region name, population, population living 
        // in city an not living in city
        var sql = "SELECT country.Region AS Name, SUM(DISTINCT country.Population) AS TotalPop, \
        SUM(DISTINCT city.Population) AS InCityPop, ROUND((SUM(DISTINCT city.Population) / SUM(DISTINCT country.Population)) * 100.0, 2) \
        AS InCityPercent, SUM(DISTINCT country.Population) - SUM(DISTINCT city.Population) \
        AS OutCityPop, ROUND(((SUM(DISTINCT country.Population) - SUM(DISTINCT city.Population)) / SUM(DISTINCT country.Population)) * 100.0, 2) \
        AS OutCityPercent FROM country, city WHERE country.Region = ? AND country.Code = city.CountryCode \
        GROUP BY country.Region LIMIT 1";

        // Receive the results and store them inside a variable
        const results = await db.query(sql, [this.response]);
        
        for (var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Name"] = row.Name;
            rowDict["TotalPop"] = row.TotalPop;
            rowDict["InCityPop"] = row.InCityPop;
            rowDict["InCityPercent"] = row.InCityPercent;
            rowDict["OutCityPop"] = row.OutCityPop;
            rowDict["OutCityPercent"] = row.OutCityPercent;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    async getSpecificContinentPopulationData() {
        // Construct a query to receive the Continent name, population, population living 
        // in city an not living in city
        var sql = "SELECT country.Continent AS Name, SUM(DISTINCT country.Population) AS TotalPop, \
        SUM(DISTINCT city.Population) AS InCityPop, ROUND((SUM(DISTINCT city.Population) / SUM(DISTINCT country.Population)) * 100.0, 2) \
        AS InCityPercent, SUM(DISTINCT country.Population) - SUM(DISTINCT city.Population) \
        AS OutCityPop, ROUND(((SUM(DISTINCT country.Population) - SUM(DISTINCT city.Population)) / SUM(DISTINCT country.Population)) * 100.0, 2) \
        AS OutCityPercent FROM country, city WHERE country.Continent = ? AND country.Code = city.CountryCode \
        GROUP BY country.Continent LIMIT 1";

        // Receive the results and store them inside a variable
        const results = await db.query(sql, [this.response]);
        
        for (var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Name"] = row.Name;
            rowDict["TotalPop"] = row.TotalPop;
            rowDict["InCityPop"] = row.InCityPop;
            rowDict["InCityPercent"] = row.InCityPercent;
            rowDict["OutCityPop"] = row.OutCityPop;
            rowDict["OutCityPercent"] = row.OutCityPercent;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    async getAllContinentPopulationData() {
        // Construct a query to receive the Continent name, population, population living 
        // in city an not living in city
        var sql = "SELECT country.Continent AS Name, SUM(DISTINCT country.Population) AS TotalPop, \
        SUM(DISTINCT city.Population) AS InCityPop, ROUND((SUM(DISTINCT city.Population) / SUM(DISTINCT country.Population)) * 100.0, 2) \
        AS InCityPercent, SUM(DISTINCT country.Population) - SUM(DISTINCT city.Population) \
        AS OutCityPop, ROUND(((SUM(DISTINCT country.Population) - SUM(DISTINCT city.Population)) / SUM(DISTINCT country.Population)) * 100.0, 2) \
        AS OutCityPercent FROM country, city WHERE country.Code = city.CountryCode \
        GROUP BY country.Continent ORDER BY TotalPop DESC";

        // Receive the results and store them inside a variable
        const results = await db.query(sql);
        
        for (var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Name"] = row.Name;
            rowDict["TotalPop"] = row.TotalPop;
            rowDict["InCityPop"] = row.InCityPop;
            rowDict["InCityPercent"] = row.InCityPercent;
            rowDict["OutCityPop"] = row.OutCityPop;
            rowDict["OutCityPercent"] = row.OutCityPercent;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    async getAllRegionPopulationData() {
        // Construct a query to receive the Continent name, population, population living 
        // in city an not living in city
        var sql = "SELECT country.Region AS Name, SUM(DISTINCT country.Population) AS TotalPop, \
        SUM(DISTINCT city.Population) AS InCityPop, ROUND((SUM(DISTINCT city.Population) / SUM(DISTINCT country.Population)) * 100.0, 2) \
        AS InCityPercent, SUM(DISTINCT country.Population) - SUM(DISTINCT city.Population) \
        AS OutCityPop, ROUND(((SUM(DISTINCT country.Population) - SUM(DISTINCT city.Population)) / SUM(DISTINCT country.Population)) * 100.0, 2) \
        AS OutCityPercent FROM country, city WHERE country.Code = city.CountryCode \
        GROUP BY country.Region ORDER BY TotalPop DESC";

        // Receive the results and store them inside a variable
        const results = await db.query(sql, [this.response]);
        
        for (var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Name"] = row.Name;
            rowDict["TotalPop"] = row.TotalPop;
            rowDict["InCityPop"] = row.InCityPop;
            rowDict["InCityPercent"] = row.InCityPercent;
            rowDict["OutCityPop"] = row.OutCityPop;
            rowDict["OutCityPercent"] = row.OutCityPercent;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    async getAllCountryPopulationData() {
        // Construct a query to receive the Country name, population, population living 
        // in city an not living in city
        var sql = "SELECT country.Name AS Name, country.Population AS TotalPop, \
        SUM(city.Population) AS InCityPop, ROUND((SUM(city.Population) / country.Population) * 100.0, 2) \
        AS InCityPercent, country.Population - SUM(city.Population) AS OutCityPop, \
        ROUND(((country.Population - SUM(city.Population)) / country.Population) * 100.0, 2) AS OutCityPercent \
        FROM city, country WHERE country.Code = city.CountryCode \
        GROUP BY country.Name, country.Population ORDER BY TotalPop DESC";

        // Receive the results and store them inside a variable
        const results = await db.query(sql);
        
        for (var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Name"] = row.Name;
            rowDict["TotalPop"] = row.TotalPop;
            rowDict["InCityPop"] = row.InCityPop;
            rowDict["InCityPercent"] = row.InCityPercent;
            rowDict["OutCityPop"] = row.OutCityPop;
            rowDict["OutCityPercent"] = row.OutCityPercent;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

}

module.exports = {
    Population,
}