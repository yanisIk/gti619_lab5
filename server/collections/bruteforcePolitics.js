BruteforcePolitics = new Mongo.Collection("bruteforcePolitics");

getMaxLoginAttemptsPerIp = function(){
	return BruteforcePolitics.findOne().maxLoginAttempsPerIp;
}

setMaxLoginAttemptsPerIp = function(maxLoginAttempts){
	var id = BruteforcePolitics.findOne()._id;
	BruteforcePolitics.update("_id": id, {$set: {maxLoginAttemptsPerIp: maxLoginAttempts}});
}

getAuthDelayAfterMaxAttempts = function(){
	return BruteforcePolitics.findOne().authDelayAfterMaxAttempts;
}

setAuthDelayAfterMaxAttempts = function(authDelay){
	var id = BruteforcePolitics.findOne()._id;
	BruteforcePolitics.update("_id": id, {$set: {authDelayAfterMaxAttempts: authDelay}});
}