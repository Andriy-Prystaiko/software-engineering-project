// Get the functions in the db.js file to use
const db = require('./../services/db');

class Country {
    // Country Code
    countryCode;
    // Country Name
    countryName;
    // countryContinent
    countryContinent;
    // Country Region
    countryRegion;
    // Country Population
    countryPopulation;
    // Country Capital
    countryCapital;
    // The User Choice Response
    response;

    // Set the 'response' as the constructor for the Country Object
    constructor(response) {
        this.response = response;
    }

    // Get ALL country details from the database
    async getCountryDetails() {
        // Determine if the value for 'countryName' is undefined or not string
        if (typeof this.countryName !== 'string') {
            // Selecting all records where the country name is 
            // dependent on the user response
            var sql = "SELECT * FROM country \
            WHERE Name = ?";

            // Pass the response within the SQL Query to gain records
            const results = await db.query(sql, [this.response]);
            // Receive the results based off of the 'results' variable
            this.countryCode = results[0].Code
            this.countryName = results[0].Name;
            this.countryContinent = results[0].Continent;
            this.countryRegion = results[0].Region;
            this.countryPopulation = results[0].Population;
            this.countryCapital = results[0].Capital;
        }
    }

    // Get the countries by ranking order
    async rankCountryByPopulation() {
        var sql = "SELECT Code, Name, Continent, Region, Population, Capital \
        FROM country \
        ORDER BY Population DESC \
        LIMIT ?"
        // Pass the response through the mySQL query
        const results = await db.query(sql, [this.response]);
        // Iterate through the 'results' to receive the data of the country
        // on the final iteration
        for (let i = 0; i < results.length; i++) {
            this.countryCode = results[i].Code
            this.countryName = results[i].Name;
            this.countryContinent = results[i].Continent;
            this.countryRegion = results[i].Region;
            this.countryPopulation = results[i].Population;
            this.countryCapital = results[i].Capital;
            console.log(this.countryName);
        }
    }
}

// Allow the Country class to be accessible across our code
module.exports = {
    Country
}