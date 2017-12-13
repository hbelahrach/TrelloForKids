/*
* @author  Hamid belahrach
*/

const test = require("tape");
const request = require("supertest");
const app = require("../server");

test("get /", assert => {
	request(app)
		.get("/")
		.expect(200)
		.end((err, res) => {
			const msg = "should return 200 OK";
			if (err) return assert.fail(msg);
			assert.pass(msg);
			assert.end();
		});
});
test.onFinish(() => process.exit(0));

