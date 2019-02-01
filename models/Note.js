/* eslint-disable semi */
// schema for the Note collection in the database

// Require mongoose
var mongoose = require('mongoose');

// Reference to the Schema constructor
var Schema = mongoose.Schema;

// the Note Schema
var NoteSchema = new Schema({
  // title field of the document
  title: String,
  // body field of the document
  body: String
});

// create the model from the above schema
var Note = mongoose.model('Note', NoteSchema);

// export the Note model
module.exports = Note;
