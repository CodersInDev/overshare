var databaseConfig = require('./config.js'),
    db = require('level')(databaseConfig.database),
    dbHelper = require('./databaseHelpers.js'),
    database = new dbHelper(db),
    Mongo = require("./mongo.js");


var routes = [
	// {
	// 	path: "/",
	// 	method: "GET",
	// 	handler: function(request, reply) {
	// 		reply.file("index.html");
	// 	}
	// },
	{
	    method: 'GET',
	    path: '/static/{path*}',
	    handler:  {
	      directory: {
	        path: './'
	      }
	    }
	},
	{
		path: '/auth',
		method: 'GET',
		handler: function(request, reply){
			reply.file("./register.html");
		}
	},

	{
		path: '/auth',
		method: 'POST',
		handler: function(request, reply){
      var newInsertedObject = {email: request.payload.email,password:request.payload.password};
        Mongo.insert([newInsertedObject],"users");
    }      
  },

  {
    path: '/login',
    method: 'GET',
    handler: function(request, reply){
      reply.file('./login.html');
    }
  },

  {
    path: '/login',
    method: 'POST',
    handler: function(request, reply){
      database.login(request.payload.email, request.payload.password, function(user){
        if(!user){
          console.log("Wrong login!");
          reply(undefined);
        }else{
          reply(user);
        }
      });
    }
  },

  {
    path: '/upload',
    method: 'POST',
    handler: function (request, reply){
    	console.log("server received");
    	var newInsertedObject = {
        fileDesc: request.payload.description,
        picBuffer:request.payload.image,
        id:request.payload.id,
        timestamp: Date.now()
      };
        Mongo.insert([newInsertedObject],"photos");
    }
  },

  // TWITTER AUTHENTICATION ROUTES //
  {
    path: '/loginTwitter',
    method: ['GET', 'POST'],
    config: {
      auth: 'twitter',
      handler: function (request, reply) {
        var creds = request.auth.credentials;
        // console.log('Credentials are ', creds);
        console.log('Logged in with twitter');
        request.auth.session.clear();
        request.auth.session.set({twitterName: creds.profile.username});
        return reply.redirect('/static/photostream.html');
      }
    }
  },

  {
    path: '/logout',
    method: 'GET',
    config: {
      auth: 'session',
      handler: function (request, reply) {
        request.auth.session.clear();
        console.log('Logged out successfully');
        return reply.redirect('/');
      }
    }
  },

  {
    path: '/',
    method: 'GET',
    config: {
      auth: {
        strategy: 'session',
        mode: 'try'
      },
      handler: function (request, reply) {
        if (request.auth.isAuthenticated) {
          console.log("YOU ARE LOGGED IN");
          // reply('<h1>You have successfully logged in</h1>');
        }
        else {
          console.log("You are NOT logged in");
          // reply('<h1>You are NOT logged in</h1>');
        }
        return reply.file('index.html');
      }
    }
  }
];

module.exports = routes;
