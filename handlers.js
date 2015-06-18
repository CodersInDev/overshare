var handlers = {
  home: function(request, reply) {
  			reply.file(__dirname + "/public/html/homepage.html");
  },

  stream: function(request, reply){
    reply.file(__dirname + "/public/html/stream.html");
  },

  loginForm: function(request, reply){
    console.log(request.auth.credentials);
    if (request.auth.isAuthenticated) {
      return reply.redirect('/stream');
    }
    reply.file(__dirname + "/public/html/login.html");
  },

  login: function(request, reply){
    var users = {simon: {id: "simon", password: 'password', name: "simonL"}};
    var account = {
    id: 'john',
    password: 'password',
    name: 'John Doe'
};
    request.auth.session.set(account);
    console.log(request.auth.credentials);
    return reply.redirect('/stream');
  }

};

module.exports = handlers;
