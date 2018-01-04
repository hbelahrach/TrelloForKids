/*
* @author  Hamid belahrach
*/

var listModel = require("../models/lists.js"),
	taskModel = require("../models/tasks.js"),
	ObjectId = require("mongoose").Types.ObjectId,
	express = require("express"),
	bodyParser = require("body-parser"),
	verify = require("../passport/jwt").verify,
	listRouter = express.Router();

listRouter.use(bodyParser.json());

listRouter.route("/:listId").put(verify, (req, res) => {
	listModel
		.find({ _id: req.params.listId })
		.update({ $set: req.body })
		.exec((err, updatedlist) => {
			if (err) throw err;
			res.json(updatedlist);
		});
});

listRouter.route("/order").post(verify, (req, res) => {
	// not the most efficient but the simplest !
	let lists = req.body.lists;
	var bulk = listModel.collection.initializeOrderedBulkOp();
	lists.forEach((el, index) => {
		bulk.find({ _id: ObjectId(el._id) }).update({ $set: { order: index } });
	});
	bulk.execute(function(error, result) {
		res.json(result);
	});
});

listRouter
	.route("/:listId/tasks")
	.post(verify, (req, res) => {
		listModel
			.findById(req.params.listId)
			.populate("tasks")
			.exec((err, list) => {
				if (err) throw err;
				if (!list) throw new Error("list not found");
				taskModel.create(req.body, (err, task) => {
					if (err) throw err;
					list.tasks.push(task);
					list.save((err, updatedlist) => {
						if (err) throw err;
						res.send(list);
					});
				});
			});
	})
	.put(verify, (req, res) => {
		listModel
			.findById(req.params.listId)
			.populate("tasks")
			.exec((err, list) => {
				if (err) throw err;
				if (!list) throw new Error("list not found");
				taskModel.create(req.body, (err, task) => {
					if (err) throw err;
					list.tasks.push(task);
					list.save((err, updatedlist) => {
						if (err) throw err;
						res.send(list);
					});
				});
			});
	});

module.exports = listRouter;
