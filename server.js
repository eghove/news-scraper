/* eslint-disable semi */

// require express for the server
var express = require('express');
// var logger = require('morgan');

// require mongoose for mongoDB manipulation
var mongoose = require('mongoose');

// set up the port
var PORT = process.env.PORT || 3000;

// initialize express
var app = express();

// CONFIGURE MIDDLEWARE

// parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make 'public' a static folder
app.use(express.static('public'));

// SET HANDLEBARS as a variable called hbars
var hbars = require('express-handlebars');
// initiate handlebars, tell it where to find main.handlebars
app.engine('handlebars', hbars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Connect to the MongoDB
// below variable used so it can deploy to heroku and continue to work locally.
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// ROUTES
require('./controllers/apiRoutes')(app);

// Start the server
app.listen(PORT, function () {
  console.log('News Scraper is running on port ' + PORT + '!');
});
