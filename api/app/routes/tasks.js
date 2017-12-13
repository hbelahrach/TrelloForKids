var taskModel = require("../../models/tasks.js"),
	express = require("express"),
	bodyParser = require("body-parser"),
	taskRouter = express.Router();

taskRouter.use(bodyParser.json());
taskRouter
	.route("/")
	.get((req, res) => {
		taskModel.find().exec((err, tasks) => {
			if (err) throw err;
			res.json(tasks);
		});
	})
	.post((req, res) => {
		taskModel.create(req.body, (err, task) => {
			if (err) throw err;
			res.json(task);
		});
	});

taskRouter
	.route("/:taskId")
	.get((req, res) => {
		taskModel.findById(req.params.taskId).exec((err, task) => {
			if (err) throw err;
			res.json(task);
		});
	})
	.delete((req, res) => {
		taskModel.remove(req.params.taskId, (err, task) => {
			if (err) throw err;
			res.json(task);
		});
	});

module.exports = taskRouter;
