var crypto = require('crypto');

var hash = function(algorithm, text){
	var digest = "";
	try {
		var shasum = crypto.createHash(algorithm);
		shasum.update(text);
		digest = shasum.digest('hex'); 
	}catch(e){
		console.log(e);
	}
	return digest;
}

exports.hash = hash;