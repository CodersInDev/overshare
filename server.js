var Hapi = require("hapi"),
	server = new Hapi.Server(),
	Cookie = require('hapi-auth-cookie'),
	// db = require('level')(databaseConfig.database),
	routes = require("./routes.js");

server.connection({
	host: "localhost",
	port: process.env.PORT || 8000
});

server.views({
    engines: { html: require('handlebars') },
    path: __dirname + '/public/templates'
});

server.register(Cookie, function (err) {
	server.auth.strategy('session', 'cookie', {
		password: 'secret',
		cookie: 'sid-overshare',
		redirectTo: '/login',
		isSecure: false
});
});

server.route(routes);

server.start(function() {
	console.log("Server running at: ", server.info.uri);
});

module.exports = server;
