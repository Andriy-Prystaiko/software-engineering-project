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
}

// Allow the Country class to be accessible across our code
module.exports = {
    Country
}