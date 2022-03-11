// HALFWAY THROUGH 11.1.5

const express = require('express');

const { animals } = require('./data/animals'); // import / require the animals data

// use the port 3001 if it is set, otherwise default to 80 for the herkou environment
const PORT = process.env.PORT || 3001;
const app = express(); // Create and instance of the app.


// THis takes in req.query, filters per the query and returns a new filtered array
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }


        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have every one 
            // of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }



    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}


// get all the data from animals.jsona and display on the webpage
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) { // call the filter function with a callback function
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});


// Listen for local port 3001
app.listen(PORT, () => {
    console.log(`API server no on port ${PORT}!`);
});