var express = require("express");

var sendFile = function(path) {
	return function(request, callback){
		callback(null, null, path); 
	}
}

var chainActions = function(action1, action2) {
	return function(request, callback){
		action1(request, function(err, result1, file) {
			if(err) {callback(err); return;}
			if(file) {callback(null,null, file); return;}
			action2(request, function(err, result2, file){
				if(err) {callback(err); return;}
				if(file) {callback(null,null, file); return;}
				callback(null, result1 + result2);
			});
		});
	}
}

var service = function(requestProcessors){
	var app = express();
	app.use(express.json());
	app.use(express.urlencoded());
	
	var handlers = {};	
	for(var i = 0; i < requestProcessors.length; i ++){		
		var action = (typeof(requestProcessors[i].action) == "function" ? requestProcessors[i].action : sendFile(requestProcessors[i].action));
		handlers[requestProcessors[i].path] = (handlers[requestProcessors[i].path] ? chainActions(handlers[requestProcessors[i].path], action): action);
	}

	Object.keys(handlers).forEach(function(key){
		app.all(key, function(request, response){
			console.log("request processing started");
			handlers[key](request, function(err, result, file){
				if(file){
					response.sendfile(file);
				}
				else if(err) {
						response.send("an error occured " + err);					
				}else {	
					response.send(result ? result : "");
				}
				console.log("request processing finished");					
			});
		});
	});

	return function(port){
		
		app.listen(port);		
	}
}

exports.http = service;
