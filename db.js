var mongodb = require("mongodb");

//We need to work with MongoClient interface in order to connect to a mongodb server
var MongoClient = mongodb.MongoClient;
//Connection url, this is where your mongodb server is running
var url = "mongodb://localhost:27017/my_database_name";
//connect method  - connect to the server
MongoClient.connect(url, function(err, db){
	if (err) {
		console.log("Unable to connect to the mongodb server. Error: ", err);
	} else {
		console.log("Connection established to ", url);

		var collections = db.collections("users");
		//Create some users
		var user1 = {username: "anita", roles: ["admin", "moderator", "user"]};
		var user2 = {username: "simon", roles: ["super-admi", "admin", "moderator", "user"]};
		var user3 = {username: "rubie", roles: ["admin", "moderator", "user"]};
		var user4 = {username: "claire", roles: ["admin", "moderator", "user"]};
		//insert some users
		collections.insert([user1, user2, user3], function(err, result){
			if (err) {
				console.log(err);
			} else {
				console.log("Inserted %d documents into the 'users' collections. The documents insertes with '_id' are: ", result.length, result);
			}
		
			db.close();
		});
	}
});
