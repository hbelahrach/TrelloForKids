var taskModel = require("../../models/tasks.js"),
	express = require("express"),
	bodyParser = require("body-parser"),
	taskRouter = express.Router();

taskRouter.use(bodyParser.json());

taskRouter.route("/order").post((req, res) => {
	// not the most efficient but the simplest !
	let tasks = req.body.tasks;
	var bulk = taskModel.collection.initializeOrderedBulkOp();
	tasks.forEach((el, index) => {
		bulk.find({ _id: ObjectId(el._id) }).update({ $set: { order: index } });
	});
	bulk.execute(function(error, result) {
		res.json(result);
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
	.put((req, res) => {
		taskModel.findByIdAndUpdate(
			req.params.taskId,
			{ $set: req.body.item },
			(err, task) => {
				if (err) throw err;
				res.json(task);
			}
		);
	});

module.exports = taskRouter;
