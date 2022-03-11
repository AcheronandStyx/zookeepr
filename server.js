// HALFWAY THROUGH 11.1.5

const express = require('express');
const fs = require('fs');
const path = require('path'); //  module built into the Node.js API that provides utilities for working with file and directory paths.

const { animals } = require('./data/animals'); // import / require the animals data

// use the port 3001 if it is set, otherwise default to 80 for the herkou environment
const PORT = process.env.PORT || 3001;
const app = express(); // Create and instance of the app.


//  this provides a file path to a given directory and makes its contents static resoourcse which are available throughout the program
app.use(express.static('public'));

// parse incoming string or arry data.  This is a method built into Express.js. It takes incoming 
// POST data and converts it to key/value pairings that can be accessed in the req.body object.
app.use(express.urlencoded({ extedned: true})); // extended: true instructs server that there may be sub-array data nested inside as well
// parse incoming json data
app.use(express.json()); // This takes the incoming post data and parses it into the req.body object used in other parts of the program


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

// find animal by ID#
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

function createNewAnimal(body, animalsArray) {
   
    const animal = body;
    animalsArray.push(animal);

    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({ animals: animalsArray}, null, 2) 
        //  ^^^^ save the JavaScript array data as JSON. null means we dont want to edii any of our 
        //existing data ajd 2 indicates we want to create whie space between ourt values to make it readabale
    );
    return animal;
    // return finished code to post route for response
}

function validateAnimal(animal) { // validate the user entered data
    if (!animal.name || typeof animal.name !== 'string') {
      return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
      return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
      return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
      return false;
    }
    return true;
  }

app.post('/api/animals', (req, res) => {
    // req.body is where out incoming content will be

    // animals.json has id's corresponding to array indexes. So the next 
    // id is equal to the length of the array
    req.body.id = animals.length.toString();

    // add animal to json file and animals array in this function
    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
      } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
      }
});

// get all the data from animals.jsona and display on the webpage
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) { // call the filter function with a callback function
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//Get animal by ID
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result); // send the result if a match is found
    } else {
        res.send(404); // send 404 if no match is found
    }
})

// serve up the index page
app.get('/', (req, res) => { // the / represents the root route of the server
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// path to animals page
app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
});

// path to zookeepers page
app.get('zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

// * is a wildcard operator. THis get() will redirect to index.html if an undefined path is entered
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Listen for local port 3001
app.listen(PORT, () => {
    console.log(`API server no on port ${PORT}!`);
});