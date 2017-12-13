const boardsRouter = require("./boards.js");
const listsRouter = require("./lists.js");
const tasksRouter = require("./tasks.js");

module.exports = function(app, db) {
	app.use("/api/boards", boardsRouter);
	app.use("/api/lists", listsRouter);
	app.use("/api/tasks", tasksRouter);
};
