// Get the functions in the db.js file to use
const db = require('./../services/db');

class Country {
    // Country Code
    countryCode;
    // Country Name
    countryName;
    // Country Continent
    countryContinent;
    // Country Region
    countryRegion;
    // Country Population
    countryPopulation;
    // Country Capital
    countryCapital;
    // The User Choice Response
    response;

    // Set the Country Name as the constructor
    constructor(response) {
        this.response = response;
    }

    // Get the Country details from the database
    async getCountryDetails() {
        if (typeof this.countryName !== 'string') {
            var sql = "SELECT Code, Name, Continent, \
            Region, Population, Capital FROM country \
            WHERE name = ?";
            const results = await db.query(sql, [this.response]);
            this.countryCode = results[0].Code;
            this.countryName = results[0].Name;
            this.countryContinent = results[0].Continent;
            this.countryRegion = results[0].Region;
            this.countryPopulation = results[0].Population;
            this.countryCapital = results[0].Capital;

            console.log(results);
        }
    }

    // Get all Country values
    async getAllCountryNames() {
        var sql = "SELECT Name FROM country";
        const results = await db.query(sql, [this.response]);
        console.log(results);
        return results;
    }

    async rankCountryByPopulation() {
        var sql = "SELECT Code, Name, Continent, Region, Population, Capital \
        FROM country \
        ORDER BY Population DESC \
        LIMIT ?"
        
        const results = await db.query(sql, [this.response]);

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

module.exports = {
    Country,
}