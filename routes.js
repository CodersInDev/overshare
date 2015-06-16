var databaseConfig = require('./config.js'),
    db = require('level')(databaseConfig.database);

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
			reply("Login and registration page");
		}
	},

	{
		path: '/auth',
		method: 'POST',
		handler: function(request, reply){
	  db.put(request.payload.email, request.payload.password, function(err){
		  if(err){
				console.log('data impossible to store');
		  }else{
				db.get(request.payload.email, function(err, result){
					if(err){
						console.log("impossible to get the user");
					}else{
						reply(request.payload.email);
					}
				});
		  }
	  });
			//read the new element added from the database
			//reply(request.payload.email);
		}
	},

];

module.exports = routes;
