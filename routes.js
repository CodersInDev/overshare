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
			reply.file("index.html");
		}
	},
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
      Bcrypt.genSalt(10, function(err, salt) {
        Bcrypt.hash(request.payload.password, salt, function(err, hash) {
          database.addUser(request.payload.email, hash, function(result){
            if(!result){
              reply("Can't add the user");
            }else{
              reply(result);
            }
          });
        });
      });
    }
  },

  {
    path: '/login',
    method: 'GET',
    handler: function(request, reply){
      reply("page login");
    }
  },

  {
    path: '/login',
    method: 'POST',
    handler: function(request, reply){
      reply("post on login");
    }
  },
  {
    path: '/upload',
    method: 'POST',
    handler: function (request, reply){
    	console.log("server received")
      fs.stat('pix',function(err,stats){
        if (err) {
          fs.mkdirSync('pix')
        };
        var piccy = fs.createWriteStream('pix/'+request.payload.title);
        piccy.write(request.payload.upload);
      });
    }
  },
];

module.exports = routes;