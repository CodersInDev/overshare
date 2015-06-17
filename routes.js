var databaseConfig = require('./config.js'),
    db = require('level')(databaseConfig.database),
    dbHelper = require('./databaseHelpers.js'),
    database = new dbHelper(db);

var routes = [
	{
		path: "/",
		method: "GET",
		handler: function(request, reply) {
			reply("Testing response");
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
      database.addUser(request.payload.email, request.payload.password, function(result){
        if(!result){
          reply("Can't add the user");
        }else{
          reply(result);
        }
      });
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
  }
];

module.exports = routes;
