const path = require('path');
const router = require('express').Router();

// Serve up the index page '/' brings us to the root route of the server
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Route to serve up the animals.html page
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

// Serve up Zookeepers
router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});
/*
 * is a wildcard and this makes any undefined route go to index.html. The order of your routes matters! 
The * route should always come last. Otherwise, it will take precedence over named routes, and you won't 
see what you expect to see on routes.
*/

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;