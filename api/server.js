require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const db = require("./config/db");

app.use(bodyParser.urlencoded({ extended: true }));
require("./app/routes")(app, {});

app.get("/", (req, res) => {
	debugger;
	res.send("\n\nHello, world 2!\n\n");
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

module.exports = app;
