var os = require("os");
var hash = require("../helpers").hash;
var async = require("async");



var digest = function(method, doc, loopCount, callback) {
		console.log("processing " + method);
		console.time(method);

		var i = 0;	
		var hashCallback = function() {
			 hash(method, doc);
			 if(i++ < loopCount)
			 	setImmediate(hashCallback);
			 else
				process.nextTick(function(){
					callback(null, hash(method, doc));
					console.timeEnd(method);
				});	 	
		}
		hashCallback();	
}

var task =  function(request, callback){

	var algorithms = request.body.alg ? Object.keys(request.body.alg) : [];
	var loopCount = request.body.loop ? request.body.loop : 1;
	var doc = request.body.txt ? request.body.txt : "";
	var digests = [];
	
	if(algorithms.length > 0) {
		if(loopCount > 1000000) loopCount = 1000000;
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
			callback(null, digests.join("<br>") + ("<hr>  <br>Service provided by: " + os.hostname()));			
		};
	} else {
		callback("no algoritms set");			
	}
	
}

exports.lab = task