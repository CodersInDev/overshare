function DatabseHepler(levelDB){
  var db = levelDB;

  this.addUser = function(email, password, cb){
    this.checkEmail(email, function(err, result){
      if(err){
        db.put(email, password, function(err){
          if(err){
            return cb(err, undefined);
          }else{
            db.get(email, function(err, result){
              if(err){
                return cb(err, undefined);
              }else{
                return cb(false, email);
              }
            });
          }
        });
      }else{
        //a user already exist with this email
        return cb("User already exist", undefined);
      }
    });
  };

  this.checkEmail = function(email, cb){
    db.get(email, function(err, result){
      if(err){
        cb(err.notFound, undefined);
      }else{
        cb(false, result);
      }
    });
  };
}

module.exports = DatabseHepler;
