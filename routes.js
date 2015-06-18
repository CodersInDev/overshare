// var databaseConfig = require('./config.js'),
//     db = require('level')(databaseConfig.database),
//     dbHelper = require('./databaseHelpers.js'),
//     database = new dbHelper(db),
//     Mongo = require("./mongo.js");
var handlers = require('./handlers.js');

var routes = [
	{
		path: "/",
		method: "GET",
    handler: handlers.home
	},

  {
    path: "/stream",
    method: "GET",
    config: {
      handler: handlers.home,
      auth: 'session'
    }
  },

  {
    path: "/login",
    method: "GET",
    config: {
      handler: handlers.loginForm
    }
  },

  {
    path: "/login",
    method: "POST",
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
  }



	// {
	//     method: 'GET',
	//     path: '/static/{path*}',
	//     handler:  {
	//       directory: {
	//         path: './'
	//       }
	//     }
	// },
	// {
	// 	path: '/auth',
	// 	method: 'GET',
	// 	handler: function(request, reply){
	// 		reply.file("./register.html");
	// 	}
	// },
  //
	// {
	// 	path: '/auth',
	// 	method: 'POST',
	// 	handler: function(request, reply){
  //     database.addUser(request.payload.email, request.payload.password, function(result){
  //       if(!result){
  //         reply("Can't add the user");
  //       }else{
  //         reply(result);
  //       }
  //     });
  //   }
  // },
  //
  // {
  //   path: '/login',
  //   method: 'GET',
  //   handler: function(request, reply){
  //     reply.file('./login.html');
  //   }
  // },
  //
  // {
  //   path: '/login',
  //   method: 'POST',
  //   handler: function(request, reply){
  //     database.login(request.payload.email, request.payload.password, function(user){
  //       if(!user){
  //         console.log("Wrong login!");
  //         reply(undefined);
  //       }else{
  //         reply(user);
  //       }
  //     });
  //   }
  // },
  //
  // {
  //   path: '/upload',
  //   method: 'POST',
  //   handler: function (request, reply){
  //   	console.log("server received");
  //   	var newInsertedObject = {fileDesc: request.payload.description,picBuffer:request.payload.image, id:request.payload.id};
  //     	Mongo.insert([newInsertedObject],"photos");
  //   }
  // }
];

module.exports = routes;
