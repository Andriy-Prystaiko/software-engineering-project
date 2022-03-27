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

    // Get the Country details from the database
    async getCountryDetails() {
        var sql = "SELECT Code, Name, Continent, \
        Region, Population, Capital FROM country \
        WHERE name = ?";
        const results = await db.query(sql, [this.response]);

        // Initialize a dictionary for storing of values
        var rowDict = {};

        // Add the corresponding values to their respective categorical key
        rowDict["Code"] = results[0].Code;
        rowDict["Name"] = results[0].Name;
        rowDict["Continent"] = results[0].Continent;
        rowDict["Region"] = results[0].Region;
        rowDict["Population"] = results[0].Population;
        rowDict["Capital"] = results[0].Capital;
        // Add the rowDict into the data array
        this.data.push(rowDict);      
    }

    // Create a function to receive the countries of a particular rank number
    async rankCountryByPopulation() {
        var sql = "SELECT Code, Name, Continent, Region, Population, Capital \
        FROM country \
        ORDER BY Population DESC \
        LIMIT ?"
        
        const results = await db.query(sql, [this.response]);

        // Iterate throughout the results (BinaryRow)
        for(var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            // Coordinate the respective values with their correct key
            rowDict["Code"] = row.Code;
            rowDict["Name"] = row.Name;
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