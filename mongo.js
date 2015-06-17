var mongodb = require("mongodb");

//We need to work with MongoClient interface in order to connect to a mongodb server
var MongoClient = mongodb.MongoClient;

var assert = require("assert");

var url = "mongodb://localhost:27017/overshare";

var mongo = {
	insertDocuments: function(members, db, callback) {
		var collections = db.collections("users");

		collections.insert(members, function(err, result) {
			console.log("Inserted " + members.length + " document(s) into the document collection");
			callback(result);
		});
	},
	findDocuments: function(username, db, callback) {
		var collections = db.collections("users");

		collections.find(username).toArray(function(err, docs) {
			console.log("Found the following records");
			callback(docs);
		});
	},
	removeDocument: function(username, db, callback) {
		var collections = db.collections("users");

		collections.remove(username, function(err, result){
			assert.equal(err, null);
			console.log("rsult is" + result);
			callback(result);
		});
	},
	insert: function(data, callback) {
		MongoClient.connect(url, function(err, db) {
			console.log("Connected correctly to server");
			mongo.insertDocuments(data, db, function(){
				db.close();
			});
		});
		callback(data);
	},
	read: function(username, callback){
		MongoClient.connect(url, function(err, db) {
			console.log("Connected correctly to server");
			mongo.findDocuments(username, db, function(docs){
				db.close();
				callback(docs);
			});
		});
	},
	deleter: function(username, callback){
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server");
			mongo.removeDocument(username, db, function(data) {
				db.close();
				callback(data);
			});
		});
	}
};

module.exports = mongo;