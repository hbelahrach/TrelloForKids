var jwt = require("jsonwebtoken");

exports.verify = (req, res, done) => {
	jwt.verify(req.query.token, process.env.secret, (err, decoded) => {
		if (err) return res.status(401).send("Invalid token");
		done();
	});
};
