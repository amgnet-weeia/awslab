//stub for lab 1_2
var AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');

var task =  function(request, callback){
var ec2= AWS.ec2  ();
var params = ();
ec2.describeInstance (params, funvtion(err, data) {
if (err) console.log(err, err.stack);
else consle.log(data);
})

	callback(null, "Hello from ec2");
	
}

exports.lab = task