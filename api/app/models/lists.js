/*
* @author  Hamid belahrach
*/

var mongooose = require("mongoose"),
	Schema = mongooose.Schema;

var listSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		order: {
			type: String
		},
		tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }]
	},
	{
		timestamps: true
	}
);

module.exports = mongooose.model("List", listSchema);
