var database = require('./mongo.js');

var handlers = {
  home: function(request, reply) {
    reply.file(__dirname + "/public/templates/homepage.html");
  },

  stream: function(request, reply){
    var context = {username: request.auth.credentials.username};
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
        console.log("vide");
        info = 'Missing username or password';
        var context = {message: info};
        return reply.view('login', context);
      }else{
        //test db
        // database.insert()
        account = {id: "simon", password: "myPassword", username: "simonLab"};
      }
    }
    if(request.method === 'get'){
       return reply.view('login');
    }
    if(account){
      request.auth.session.set(account);
      return reply.redirect('/stream');
    }
  },

  logout: function (request, reply) {
    request.auth.session.clear();
    return reply.redirect('/');
  }

};

module.exports = handlers;
