/* eslint-disable semi */
// load the scraping tools
var axios = require('axios');
var cheerio = require('cheerio');

// load mongoose
var mongoose = require('mongoose');

// require all models
var db = require('../models');

module.exports = function (app) {
  // GET route that performs the scraping of Vox.com
  app.get('/scrape', function (req, res) {
    // grab the body of the html with axios
    axios.get('https://www.vox.com/').then(function (response) {
      // load that data into cherio and save it to $ for a shorthand
      var $ = cheerio.load(response.data);
      // save an empty result object
      var results = [];
      // trying to grab the article title
      $('div.c-entry-box--compact--article').each(function (i, element) {
        var data = $(element).text();
        results.push({
          data: data
        });
      });
      console.log(results);
    })
    res.send('Scraped!')
  })
}
