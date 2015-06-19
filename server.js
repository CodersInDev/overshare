var Hapi = require("hapi"),
	server = new Hapi.Server(),
	Cookie = require('hapi-auth-cookie'),
	routes = require("./routes.js"),
	Bell = require('bell');


server.connection({
	port: process.env.PORT || 8000
});

server.views({
    engines: { html: require('handlebars') },
    path: __dirname + '/public/templates'
});

server.register([Bell,Cookie], function (err) {
	server.auth.strategy('session', 'cookie', {
		password: 'secret',
		cookie: 'sid-overshare',
		redirectTo: '/login',
		isSecure: false
  });

	server.auth.strategy('twitter', 'bell', {
		provider: 'twitter',
		password: 'twitterPassword',
		isSecure: false,
		clientId: process.env.TWITTER_ID,//'lNylPoAhpP4m1Ct0y13od1QIe'
		clientSecret: process.env.TWITTER_PASSWORD//'SK9eFoUnCwAinRUi7NdP1ta9PzRqlTTDlOrCUo4O3pTkx3PWKw'//process.env.TWITTER_PASSWORD
});
});

server.route(routes);

server.start(function() {
	console.log("Server running at: ", server.info.uri);
});

module.exports = server;
