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
		lists: [{ type: Schema.Types.ObjectId, ref: "List" }]
	},
	{
		timestamps: true
	}
);

module.exports = mongooose.model("Board", listSchema);
