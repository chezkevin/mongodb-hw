// Require mongoose
var mongoose = require("mongoose");

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

// create the article schema
var articleSchema = new Schema({
    title: {
      type: String
    },
    link: {
      type: String
    },
    // comments property for the article
    comments: [{
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }]
});

// set up the article model
var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
