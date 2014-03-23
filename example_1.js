var task =  function(request, callback){

	var fName = request.query.fName ? request.query.fName : "missing parameter: fName";
	var lName = request.query.lName ? request.query.lName : "missing parameter: lName";
	callback(null, fName + " " + lName);
}

exports.lab = task