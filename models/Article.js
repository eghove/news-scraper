/* eslint-disable semi */
// schema for the Article collection in the database

// Require mongoose
var mongoose = require('mongoose');

// Reference to the schema constructor
var Schema = mongoose.Schema;

// the Article Schema
var ArticleSchema = new Schema({
  // field to store the title of the article
  title: {
    type: String,
    required: true
  },
  // field to store the link of the article
  link: {
    type: String,
    required: true
  },
  // field to store the summary of the article
  summary: {
    type: String,
    default: 'None.'
  },
  // field to store byline
  byline: {
    type: String,
    default: 'None.'
  },
  // field that stores a Note id
  note: {
    type: Schema.Types.ObjectId,
    ref: 'Note'
  },
  // field that will store if the article has already been read
  read: {
    type: Boolean,
    default: false
  },
  // field that will store the date scraped
  dateScraped: {
    type: Date
  }
});

// create the model from the above schema
var Article = mongoose.model('Article', ArticleSchema);

// export the Article model
module.exports = Article;
