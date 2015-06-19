var Mongodb = require('mongodb'),
	MongoClient = Mongodb.MongoClient,
	url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/overshare';


var mongo = {
	ObjectId: Mongodb.ObjectID,

	insert: function(data, dbCollection, callback) {
		MongoClient.connect(url, function(err, db) {
			console.log("Connected correctly to server");
			var collection = db.collection(dbCollection);
			collection.insert(data, function(err, result){
				console.log("Inserted " + data.length + "document(s) into the document collection");
				db.close();
			});
		});

	},
	read: function(query, projection, dbCollection, callback){
		MongoClient.connect(url, function(err, db) {
			console.log("Connected correctly to server");
			var collection = db.collection(dbCollection);
			collection.find(query, projection).toArray(function(err, results) {
				db.close();
				callback(results);
			});
		});
	}
	// deleter: function(username, callback){
	// 	MongoClient.connect(url, function(err, db) {
	// 		assert.equal(null, err);
	// 		console.log("Connected correctly to server");
	// 		mongo.removeDocument(username, db, function(data) {
	// 			db.close();
	// 			callback(data);
	// 		});
	// 	});
	// }
};

module.exports = mongo;
