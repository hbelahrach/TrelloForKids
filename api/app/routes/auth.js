/*
* @author  Hamid belahrach
*/

var userModel = require("../models/users.js"),
	express = require("express"),
	bodyParser = require("body-parser"),
	jwt = require("jsonwebtoken"),
	authRouter = express.Router(),
	verify = require("../passport/jwt").verify;

module.exports = function(app, passport) {
	authRouter.use(bodyParser.json());
	authRouter.route("/signup").post((req, res) => {
		passport.authenticate("local", {}, (err, params) => {
			if (err) return res.status(500).send(err);
			if (params.user) {
				return res.status(401).send("User exists");
			} else {
				var newUser = new userModel();
				newUser.email = params.email;
				newUser.password = newUser.generateHash(params.password);
				newUser.save(function(err) {
					if (err) return res.status(500).send(err);
					let token = jwt.sign({ data: newUser }, process.env.secret);
					return res.json({ token: token });
				});
			}
		})(req, res);
	});

	authRouter.route("/login").post((req, res) => {
		passport.authenticate("local", {}, (err, params) => {
			if (err) return res.json(err);
			if (params.user) {
				if (params.user.validPassword(params.password)) {
					let token = jwt.sign(
						{ data: params.user },
						process.env.secret
					);
					return res.json({ token: token });
				} else {
					return res.status(401).send("Incorrect password");
				}
			} else {
				return res.status(401).send("User not found");
			}
		})(req, res);
	});

	authRouter.route("/logout").post(verify, (req, res) => {
		res.send("logged out");
	});
	return authRouter;
};
