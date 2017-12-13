require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const cors = require("cors");
var mongoose = require("mongoose");

mongoose.connect(process.env.dbUrl, { useMongoClient: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("openUri", function() {
	console.log("Connected correctly to server");
});

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require("./app/routes")(app);

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

module.exports = app;
