// Require mongoose
var mongoose = require("mongoose");

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

// create the article schema
var commentSchema = new Schema({
    author: {
      type: String
    },
    body: {
      type: String
    }
});

// set up the article model
var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
