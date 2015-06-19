var database = require('./mongo.js');
Bcrypt = require('bcrypt');

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
          console.log(result);
          account = result[0];
          if(account){
            request.auth.session.set(account);
            return reply.redirect('/stream');
          }
        });
        // account = {id: "simon", password: "myPassword", username: "simon Lab"};
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
      //try to auth with the new email and password
      return reply.redirect('/');
    }
  }

};

module.exports = handlers;
