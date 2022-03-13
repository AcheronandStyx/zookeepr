const express = require('express');
const PORT = process.env.PORT || 3001; // use the port 3001 if it is set, otherwise default to 80 for the herkou environment
const app = express(); // Create and instance of the app.
const apiRoutes = require('./routes/apiRoutes'); // read the index.js at each location to use its routing functions
const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.static('public')); //  this provides a file path to a given directory and makes its contents static resoourcse which are available throughout the program


// parse incoming string or arry data.  This is a method built into Express.js. It takes incoming POST data and converts it to key/value pairings that can be accessed in the req.body object.
app.use(express.urlencoded({ extedned: true })); // extended: true instructs server that there may be sub-array data nested inside as well

app.use(express.json()); // This takes the incoming post data and parses it into the req.body object used in other parts of the program

/*
Tells the server that any time a client navigates to <ourhost>/api, the app will use the router we set up in apiRoutes. 
If / is the endpoint, then the router will serve back our HTML routes.
*/
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


// Listen for local port 3001
app.listen(PORT, () => {
    console.log(`API server no on port ${PORT}!`);
});