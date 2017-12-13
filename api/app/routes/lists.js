var listModel = require("../../models/lists.js"),
	taskModel = require("../../models/tasks.js"),
	express = require("express"),
	bodyParser = require("body-parser"),
	listRouter = express.Router();

listRouter.use(bodyParser.json());
listRouter
	.route("/")
	.get((req, res) => {
		listModel
			.find()
			.populate("tasks")
			.exec((err, lists) => {
				if (err) throw err;
				res.json(lists);
			});
	})
	.post((req, res) => {
		listModel.create(req.body, (err, list) => {
			if (err) throw err;
			res.json(list);
		});
	});

listRouter
	.route("/:listId")
	.get((req, res) => {
		listModel
			.findById(req.params.listId)
			.populate("tasks")
			.exec((err, list) => {
				if (err) throw err;
				res.json(list);
			});
	})
	.delete((req, res) => {
		listModel.remove(req.params.listId, (err, list) => {
			if (err) throw err;
			res.json(list);
		});
	});

listRouter
	.route("/:listId/tasks")
	.get((req, res) => {
		listModel
			.findById(req.params.listId)
			.populate("tasks")
			.exec((err, list) => {
				if (err) throw err;
				res.json(list.tasks);
			});
	})
	.post((req, res) => {
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
