/* eslint-disable semi */

// require express for the server
var express = require('express');
// var logger = require('morgan');

// require mongoose for mongoDB manipulation
var mongoose = require('mongoose');

// load the scraping tools
var axios = require('axios');
var cheerio = require('cheerio');

// require all models (commented out until there are models there)
// var db = require('./models');

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

// Connect to the MongoDB
// below variable used so it can deploy to heroku and continue to work locally.
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// ROUTES

// Start the server
app.listen(PORT, function () {
  console.log('News Scraper is running on port ' + PORT + '!');
});
