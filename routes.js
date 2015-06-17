var databaseConfig = require('./config.js'),
    db = require('level')(databaseConfig.database),
    dbHelper = require('./databaseHelpers.js'),
    database = new dbHelper(db),
    Bcrypt = require('bcrypt');

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
      //create the hash here
      
      database.addUser(request.payload.email, request.payload.password, function(err, result){
        if(err){
          reply("Can't add the user");
        }else
          reply(result);
        }
      );
	  }
  }
];

module.exports = routes;
