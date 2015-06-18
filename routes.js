var databaseConfig = require('./config.js'),
    db = require('level')(databaseConfig.database),
    dbHelper = require('./databaseHelpers.js');
    var database = new dbHelper(db);
    var Mongo = require("./mongo.js");
    var aws = require('aws-sdk');

function awsS3(request, reply){
	console.log("awsS3 handler received")
	aws.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});
	var s3 = new aws.S3();
	var s3_params = {
		Bucket: process.env.S3_BUCKET,
		Key: 'images/' + request.query.file_name,
		Expires: 60,
		ContentType: request.query.file_type,
		ACL: 'public-read'
	};
	s3.getSignedUrl('putObject', s3_params, function(err, data){
		console.log("awsS3 signed URL received: ", data)
        if(err){
          console.log("err ",err);
        } else {
          reply(data);
        }
    });
}


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

  // {
  //   path: '/login',
  //   method: 'POST',
  //   handler: function(request, reply){
  //     database.login(request.payload.email,request.payload.password, function(user){
  //       if(!user){
  //         console.log("Wrong login!");
  //         reply(undefined);
  //       }else{
  //         reply(user);
  //       }
  //     });
  //   }
  // },

  {
    path: '/upload',
    method: 'POST',
    handler: function (request, reply){
    	console.log("server received");
    	var newInsertedObject = {
    		fileDesc: request.payload.description,
    		picBuffer: request.payload.image, 
    		id: request.payload.id,
    		timestamp: Date.now()
    	};
      	Mongo.insert([newInsertedObject],"photos");
    }
  },

  // {
  //   path: '/view',
  //   method: 'GET',
  //   handler: function (request, reply){
  //   	console.log("view request received");
  //   	reply.write()
  //   }
  // },
  {
    method: "POST",
    path: "/sign_s3",
    handler: awsS3
  }
];



module.exports = routes;
