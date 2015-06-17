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
    db.put(email, password, function(err){
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
  };
}

module.exports = DatabseHepler;