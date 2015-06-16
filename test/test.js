var Lab = require("lab"),
	server = require("../server.js"),
	lab = exports.lab = Lab.script(),
	Code = require("code");


lab.experiment("server test", function() {
	lab.test("main endpoint", function(done){
		var options = {
			method: "GET",
			url: "/"
		};

		server.inject(options, function(response) {
			Code.expect(response.statusCode).to.equal(200);
			done();
		});
	});


	lab.test("login and registration page", function(done){
		var options = {
			method: "GET",
			url: "/auth"
		};

		server.inject(options, function(response) {
			Code.expect(response.statusCode).to.equal(200);
			done();
		});
	});

	lab.test("login and registration page on a post", function(done){
		var options = {
			method: "POST",
			url: "/auth",
			payload: {email: "example@mail.com", password: 1234}
		};

		server.inject(options, function(response) {
			var payload = options.payload;
			Code.expect(response.statusCode).to.equal(200);
			//check the return value of the endpoint
			Code.expect(response.result).to.equal(payload.email);
			done();
		});
	});

});
