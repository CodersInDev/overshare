var Hapi = require("hapi"),
	server = new Hapi.Server(),
	routes = require("./routes.js"),
	Bell = require("bell"),
	Cookie = require("hapi-auth-cookie"),
	config = require("getconfig");

server.connection({
	// host: "localhost",
	// port: 8000
	host: config.hostname,
	port: config.port
});

server.register([Bell, Cookie], function (err) {

	if (err) {
		throw err;
	}

	server.auth.strategy('twitter', 'bell', {
		provider: 'twitter',
		password: config.auth.twitter.password,
		isSecure: false,
		clientId: config.auth.twitter.clientId,
		clientSecret: config.auth.twitter.clientSecret
	});

	server.auth.strategy('session', 'cookie', {
		password: config.session.cookieOptions.password,
		cookie: 'sid',
		redirectTo: '/',
		redirectOnTry: false,
		isSecure: false
	});

	server.route(routes);

	server.start(function () {
		console.log("Server running at: ", server.info.uri);
	});
});

// server.route(routes);

// server.start(function() {
//	console.log("Server running at: ", server.info.uri);
// });

module.exports = server;