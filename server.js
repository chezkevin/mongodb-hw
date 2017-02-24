// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
// use mongoose to store data
var mongoose = require("mongoose");
// get access to mongoose schema methods
var Schema = mongoose.schema;

// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");

mongoose.Promise = Promise;

// Database configuration
mongoose.connect('mongodb://localhost/news_db');

// Hook mongoose configuration to the db variable
var db = mongoose.connection;
//require("./database/db.js");
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongoose");
});

// require models for articles and comments
var Article = require("./models/article.js");
var CommentModel = require("./models/comment.js");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Routes =============================================================

require("./routes/scrape-routes.js")(app);

// Override with POST having ?_method=DELETE
//app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

// initialize handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static directory
app.use(express.static("./public"));

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
