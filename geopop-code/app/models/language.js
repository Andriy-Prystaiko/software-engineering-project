// Get the functions in the db.js file to use
const db = require('./../services/db');

class Language {
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
        rowDict["Language"] = '';
        rowDict["LangPop"] = '';
        rowDict["LangPopPercent"] = '';
        // For each iteration, add the new rowDict into the data array
        this.data.push(rowDict);
    }

    async selectFromSpecificLanguage() {
        // Construct a query to receive the language, the population that speaks the language, and 
        // the percentage of the population that speaks the language
        var sql = "SELECT countrylanguage.Language AS Language, \
        ROUND((SELECT SUM((countrylanguage.Percentage / 100) * country.Population)), 0) AS LangPop, \
        ROUND(((SELECT SUM((countrylanguage.Percentage / 100) * country.Population)) / (SELECT SUM(country.Population) FROM country)) * 100, 3) \
        AS LangPopPercent FROM country, countrylanguage WHERE countrylanguage.Language = ? AND \
        country.Code = countrylanguage.CountryCode GROUP BY countrylanguage.Language LIMIT 1";

        // Receive the results and store them inside a variable
        const results = await db.query(sql, [this.response]);
        
        for (var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Language"] = row.Language;
            rowDict["LangPop"] = row.LangPop;
            rowDict["LangPopPercent"] = row.LangPopPercent;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }

    async selectAllLanguages() {
        // Construct a query to receive the languages, theirpopulation that speaks the language, and 
        // the percentage of the population that speaks the language
        var sql = "SELECT countrylanguage.Language AS Language, \
        ROUND((SELECT SUM((countrylanguage.Percentage / 100) * country.Population)), 0) AS LangPop, \
        ROUND(((SELECT SUM((countrylanguage.Percentage / 100) * country.Population)) / (SELECT SUM(country.Population) FROM country)) * 100, 3) \
        AS LangPopPercent FROM country, countrylanguage WHERE country.Code = countrylanguage.CountryCode \
        GROUP BY countrylanguage.Language ORDER BY LangPop DESC";

        // Receive the results and store them inside a variable
        const results = await db.query(sql, [this.response]);
        
        for (var row of results) {
            // Initialize a dictionary to store values
            var rowDict = {};
            rowDict["Language"] = row.Language;
            rowDict["LangPop"] = row.LangPop;
            rowDict["LangPopPercent"] = row.LangPopPercent;
            // For each iteration, add the new rowDict into the data array
            this.data.push(rowDict);
        }
    }


}

module.exports = {
    Language,
}