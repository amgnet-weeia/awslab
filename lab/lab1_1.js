var hash = require("../helpers").hash;
var async = require("async");

var digest = function(method, doc, loopCount, callback) {
		console.log("processing " + method);
		console.time(method);
		var taskArray = [];
								
		for(var j = 0; j < loopCount -1 ; j++){		
			hash(method, doc);
		}
		var digestValue = hash(method, doc);
		var digest =  method + ": " + digestValue;
		console.timeEnd(method);
		callback(null, digest);		
}

var task =  function(request, callback){

	var algorithms = request.body.alg ? Object.keys(request.body.alg) : [];
	var loopCount = request.body.loop ? request.body.loop : 1;
	var doc = request.body.txt ? request.body.txt : "";
	var digests = [];
	
	if(algorithms.length > 0) {
		if(loopCount > 1000000) loopCount = 100000;
		console.log("request: algoritms: " + algorithms.join(', ') + "; loop: " + loopCount);
		var queueForAlgorithms = async.queue(function(method, callback){
				digest(method, doc, loopCount, callback);
			}, algorithms.length);

		for(var i = 0; i < algorithms.length; i++){	
			var method = algorithms[i];		
			console.log( method + " queued for processing...");
			queueForAlgorithms.push(method, function(err, digest){
				if(err) {
					digests.push(err);			
				} else {
					digests.push(digest);
				}
			});
							
		}
		queueForAlgorithms.drain = function(){		
			callback(null, digests.join("<br>"));			
		};
	} else {
		callback("no algoritms set");			
	}
	
}

exports.lab = task