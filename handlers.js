var database = require('./mongo.js');
var Bcrypt = require('bcrypt');
var aws = require('aws-sdk');
var mandrill = require("mandril-api/mandrill")
var mandrill_client = new mandrill.Mandrill(process.env.MANDRILL)

var handlers = {
  home: function(request, reply) {
    reply.file(__dirname + "/public/templates/homepage.html");
  },

  stream: function(request, reply){
    var context = {email: request.auth.credentials.email};
    return reply.view('stream', context);
  },

  login: function(request, reply){
    var info = '';
    var account = null;
    if(request.auth.isAuthenticated){
      return reply.redirect('/stream');
    }
    if(request.method === 'post'){
      if(!request.payload.email || !request.payload.password){
        info = 'Missing username or password';
        var context = {message: info};
        return reply.view('login', context);
      }else{
        database.read({email: request.payload.email}, {}, "users", function(result){
          if(result.length){
            request.auth.session.set(result[0]);
            return reply.redirect('/stream');
          }else{
            info = "Sorry this account doesn't exist";
            return reply.view('login', {message: info});
          }
        });
      }
    }
    if(request.method === 'get'){
       return reply.view('login');
    }
  },

  logout: function (request, reply) {
    request.auth.session.clear();
    return reply.redirect('/');
  },

  user: function (request, reply){
    if(request.method === 'get'){
      if(request.auth.isAuthenticated){
        return reply.redirect('/stream');
      }else{
        return reply.view('user');
      }
    }
    if(request.method === 'post'){
      var password = request.payload.password;
      var info = '';
      //check if a user already has the same email
      database.read({email: request.payload.email}, {}, "users", function(result){
        if(result.length){
          message = 'This email is already used!';
          return reply.view('user', {message: info});
        }
      });
      user = {email: request.payload.email};
      Bcrypt.genSalt(10, function(err, salt) {
        Bcrypt.hash(password, salt, function(err, hash) {
          user.password = hash;
          database.insert(user, "users");
        });
      });
      sendEmail(request.payload.email)
      //try to auth with the new email and password

      //return this.login(request, reply);
      return reply.redirect('/');
    }
  },

  awsS3: function(request, reply){
	console.log("awsS3 handler received");
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
		console.log("awsS3 signed URL received: ", data);
        if(err){
          console.log("err ",err);
        } else {
          reply(data);
        }
    });
  },

  twitter: function(request, reply){
    var creds = request.auth.credentials;
    request.auth.session.clear();
    request.auth.session.set({email: creds.profile.username});
    return reply.redirect('/');
  }

};

function sendEmail(email) {
var data = {
          'from_email': 'alex.rubner@gmail.com',
          'to': [
          {
            'email': email,
            'name': 'CodersInDev',
            'type': 'to'
          }
        ],
          'autotext': 'true',
          'subject': 'Thanks for signing up to Overshare',
          'html': 'Welcome to Overshare. Your account is now active'
};
mandrill_client.messages.send({"message": data, "async": false},function(result) {
    console.log(result);
}, function(e) {
    console.log("Error " + e.message);
});
}

module.exports = handlers;
