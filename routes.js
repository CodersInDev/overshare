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
      path: '/public/{path*}',
      method: 'GET',
			handler:  {
				directory: {
					path: './public'
				}
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
  },

  {
    path: "/user",
    method: ["GET", "POST"],
    config:{
      handler: handlers.user,
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
    method: "POST",
    path: "/sign_s3",
    handler: handlers.awsS3
  },

  {
    path: '/loginTwitter',
    method: 'GET',
    config:{
      auth: 'twitter',
      handler: handlers.twitter
    }
  }
];

module.exports = routes;
