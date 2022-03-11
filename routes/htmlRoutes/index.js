const path = require('path');
const router = require('express').Router();

// serve up the index page
router.get('/', (req, res) => { // the / represents the root route of the server
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// path to animals page
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

// path to zookeepers page
router.get('zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

// * is a wildcard operator. THis get() will redirect to index.html if an undefined path is entered
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;