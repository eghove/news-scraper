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
      // setting up the cherio element
      $('div.c-entry-box--compact--article').each(function (i, element) {
        // save an empty result object
        var results = {};
        // grab the link
        var link = $(element).children('a').attr('href');
        // grab the article title
        var title = $(element).children('div').children('h2').text();
        // grab the article byline
        var byline = $(element).children('div').children('div.c-byline').children('span').children('a').text();
        // grab the summary
        var summary = $(element).children('div').children('p.p-dek').text();
        // putting it all in the results object
        results.title = title;
        results.byline = byline;
        results.summary = summary;
        results.link = link;
        // create a new Article using the `results` object built from scraping
        db.Article.create(results)
          .then(function (dbArticle) {
            console.log(dbArticle);
          })
          .catch(function (err) {
            // log the error if needed
            console.log(err);
          });
      });
    })
    // let the client know the scraping is done. Probably want to change this to a status code at some point.
    res.send('Scraped!')
  });

  // GET route for getting all Articles from the database
  app.get('/articles', function (req, res) {
    // grab all documents in the Articles collection
    db.Article.find({})
      .then(function (dbArticle) {
        // if successful, send all the article back to the client as a JSON object
        res.json(dbArticle);
      })
      .catch(function (err) {
        // if an error occurred, send it to the cliend
        res.json(err);
      })
  })

}
