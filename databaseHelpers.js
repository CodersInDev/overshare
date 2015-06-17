Bcrypt = require('bcrypt');

function DatabseHepler(levelDB){
  var db = levelDB;

  this.addUser = function(email, password, cb){
    this.checkEmail(email, function(result){
      if(!result){
        insertUser(email, password, cb);
      }else{
        //a user already exist with this email
        return cb("User already exist", undefined);
      }
    });
  };

  this.checkEmail = function(email, cb){
    db.get(email, function(err, result){
      if(err){
        cb(undefined);
      }else{
        cb(result);
      }
    });
  };

  var insertUser = function(email, password, cb){
    Bcrypt.genSalt(10, function(err, salt) {
      Bcrypt.hash(password, salt, function(err, hash) {
        db.put(email, hash, function(err){
          if(err){
            return cb(undefined);
          }else{
            db.get(email, function(err, result){
              if(err){
                return cb(undefined);
              }else{
                return cb(email);
              }
            });
          }
        });
      });
    });
  };

  this.login = function(email, password, cb){
    this.checkEmail(email, function(result){
      if(!result){
        return cb(undefined);
      }else{
        //check the password
        Bcrypt.compare(password, result, function(err, isCorrect) {
        if(err) {
          return cb(undefined);
        }
        if(isCorrect){
          console.log("logged!");
          return cb(email);
        }else{
          console.log("not correct");
          return cb(false);
        }
        });

      }
    });
  };
}

module.exports = DatabseHepler;
