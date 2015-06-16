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
			var result = response.result;
			Code.expect(response.statusCode).to.equal(200);
			done();
		});
	});
});

