var Hapi = require("hapi"),
	server = new Hapi.Server(),
	routes = require("./routes.js");

server.connection({
	host: "localhost",
	port: 8000
});

server.route(routes);

server.start(function() {
	console.log("Server running at: ", server.info.uri);
});

module.exports = server;