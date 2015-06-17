var mongo = require("./mongo.js");
var routes = [
	{
		path: "/",
		method: "GET",
		handler: function(request, reply) {
			reply("Testing response");
		}
	}
];

module.exports = routes;