/*
* @author  Hamid belahrach
*/

require("dotenv").config();

const express = require("express"),
	app = express(),
	port = process.env.PORT || 3000,
	host = process.env.HOST || "localhost",
	MongoClient = require("mongodb").MongoClient,
	bodyParser = require("body-parser"),
	cors = require("cors"),
	cookieParser = require("cookie-parser"),
	mongoose = require("mongoose"),
	passport = require("passport");

mongoose.connect(process.env.dbUrl, { useMongoClient: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("openUri", function() {
	console.log("Connected correctly to server");
});

require("./app/passport/passport")(passport);

app.use(cors());
app.options("*", cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

require("./app/routes")(app, passport);

app.listen(port, host, () => {
	console.log(`listening on port ${port}`);
});

module.exports = app;
