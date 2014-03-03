var task =  function(request, callback){

	var fName = request.query.fName ? request.query.fName : "brak parametru fName";
	var lName = request.query.lName ? request.query.lName : "brak parametru lName";
	callback(null, fName + " " + lName);
}

exports.lab = task