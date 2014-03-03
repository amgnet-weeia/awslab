var hash = require("./helpers").hash;


var task =  function(request, callback){
	var algorithms = request.body.alg ? Object.keys(request.body.alg) : [];
	var loopCount = request.body.loop ? request.body.loop : 1;
	var doc = request.body.txt ? request.body.txt : "";
	var digests = [];
	
	console.log("request: algoritms " + algorithms.join(', ') + ", loop: " + loopCount);
	for(var i = 0; i < algorithms.length; i++){		
		var method = algorithms[i];
		console.time(method);
		for(var j = 0; j < loopCount-1; j++){
			hash(method, doc);
		}
		digests[i] =  method + ": " + hash(method, doc);		
		console.timeEnd(method);
	}
		
	callback(null, digests.join("<br>"));
}

exports.lab = task