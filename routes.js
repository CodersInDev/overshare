var handlers = require('./handlers.js');

var routes = [
	{
		path: "/",
		method: "GET",
    config: {
      handler: handlers.stream,
      auth: 'session'
    }
	},

  {
    path: "/stream",
    method: "GET",
    config: {
      handler: handlers.stream,
      auth: 'session'
    }
  },

  {
    path: "/login",
    method: ["POST", "GET"],
    config: {
      handler: handlers.login,
      auth: {
        mode: 'try',
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
            redirectTo: false
        }
      }
    }
  },

  {
    path: "/logout",
    method: "GET",
    config:{
      handler: handlers.logout,
      auth: 'session'
    }
  }
];

module.exports = routes;
