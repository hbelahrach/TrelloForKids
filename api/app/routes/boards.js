var boardModel = require("../../models/boards.js"),
	listModel = require("../../models/lists.js"),
	express = require("express"),
	bodyParser = require("body-parser"),
	_ = require("lodash"),
	boardRouter = express.Router();

boardRouter.use(bodyParser.json());
boardRouter
	.route("/")
	.get((req, res) => {
		boardModel
			.find()
			.populate({
				path: "lists",
				populate: {
					path: "tasks",
					model: "Task"
				}
			})
			.exec((err, boards) => {
				if (err) throw err;
				res.json(boards);
			});
	})
	.post((req, res) => {
		boardModel.create(req.body, (err, board) => {
			if (err) throw err;
			res.json(board);
		});
	});

boardRouter
	.route("/:boardId/lists")
	.get((req, res) => {
		boardModel
			.findById(req.params.boardId)
			.populate({
				path: "lists",
				populate: {
					path: "tasks",
					model: "Task"
				}
			})
			.exec((err, board) => {
				if (err) throw err;
				//toObject();
				let lists = board.lists;
				lists.sort((m1, m2) => m1.order > m2.order);
				res.json(lists);
			});
	})
	.post((req, res) => {
		boardModel
			.findById(req.params.boardId)
			.populate({
				path: "lists",
				populate: {
					path: "tasks",
					model: "Task"
				}
			})
			.exec((err, board) => {
				if (err) throw err;
				if (!board) throw new Error("board not found");
				let list = req.body;
				list.order = board.lists.length;
				listModel.create(list, (err, list) => {
					if (err) throw err;
					board.lists.push(list);
					board.save((err, updatedboard) => {
						if (err) throw err;
						board.lists.sort((m1, m2) => m1.order > m2.order);
						res.send(board);
					});
				});
			});
	});

boardRouter.route("/:boardId/lists/order").post((req, res) => {
	let startIndex = req.body && req.body.startIndex;
	let endIndex = req.body && req.body.endIndex;

	boardModel
		.findById(req.params.boardId)
		.populate("lists")
		.exec((err, board) => {
			if (err) throw err;
			let lists = board.lists;
			lists = _.filter(lists, el => {
				return (
					startIndex > endIndex &&
					el.order >= startIndex &&
					el.order <= endIndex
				);
			});

			lists.sort((m1, m2) => m1.order > m2.order);

			if (lists.length) {
				let first = lists[0].order;
				for (var i = 0; i < length - 1; i--) {
					lists[i].order = lists[i + 1].order;
				}
				list[length - 1].order = list;
			}

			var bulk = listModel.collection.initializeOrderedBulkOp();
			lists.map(el => {
				bulk
					.find({ _id: el._id } })
					.update({ $set: { order: el.order } });
			});
			
			bulk.execute(function(error) {
				res.json(lists);
			});
		});
});

boardRouter
	.route("/:boardId")
	.get((req, res) => {
		boardModel
			.findById(req.params.boardId)
			.populate({
				path: "lists",
				populate: {
					path: "tasks",
					model: "Task"
				}
			})
			.exec((err, board) => {
				if (err) throw err;
				board.lists.sort((m1, m2) => m1.order > m2.order);
				res.json(board);
			});
	})
	.delete((req, res) => {
		boardModel.remove(req.params.boardId, (err, board) => {
			if (err) throw err;
			res.json(board);
		});
	});

module.exports = boardRouter;
