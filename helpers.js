var crypto = require('crypto');

var hash = function(algorithm, text){
	
	var shasum = crypto.createHash(algorithm);
	shasum.update(text);
	return  shasum.digest('hex');
}

exports.hash = hash;