const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

// router lets us delcare paths in one file and export them elsewhere so all of teh express code deosn't have to be in one file
const router = require('express').Router(); // create an instance of router

router.post('/animals', (req, res) => {
    // req.body is where out incoming content will be

    console.log(animals);
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
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) { // call the filter function with a callback function
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//Get animal by ID
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result); // send the result if a match is found
    } else {
        res.send(404); // send 404 if no match is found
    }
})

module.exports  = router;