/*
* @author  Hamid belahrach
*/

const boardsRouter = require("./boards.js");
const listsRouter = require("./lists.js");
const tasksRouter = require("./tasks.js");
const authRouter = require("./auth.js");

module.exports = function(app, passport) {
	app.use("/api", authRouter(app, passport));
	app.use("/api/boards", boardsRouter);
	app.use("/api/lists", listsRouter);
	app.use("/api/tasks", tasksRouter);
};
