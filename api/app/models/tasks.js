/*
* @author  Hamid belahrach
*/

var mongooose = require("mongoose"),
	Schema = mongooose.Schema;

var taskSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		order: {
			type: String
		},
		done: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongooose.model("Task", taskSchema);
