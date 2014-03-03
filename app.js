var lab1_1 = require("./lab1_1").lab

var example_1 = require("./example_1").lab


var urlMap = [
	{path: "/", action:__dirname + "/index.html"},	 
	{path: "/digest", action: lab1_1},	
	{path: "/example_1", action: example_1}, 
	];

var service = require("./service").http(urlMap);

service(8080);