/*
* @author  Hamid belahrach
*/

var boardModel = require("../../models/boards.js"),
	listModel = require("../../models/lists.js"),
	express = require("express"),
	ObjectId = require("mongoose").Types.ObjectId,
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

boardRouter.route("/:boardId").get((req, res) => {
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
			board.lists.map(list => {
				list.tasks.sort((m1, m2) => m1.order > m2.order);
			});
			res.json(board);
		});
});

boardRouter.route("/:boardId/lists").post((req, res) => {
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
					board.lists.map(list => {
						list.tasks.sort((m1, m2) => m1.order > m2.order);
					});
					res.send(board);
				});
			});
		});
});

module.exports = boardRouter;
