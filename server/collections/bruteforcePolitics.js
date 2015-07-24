BruteforcePolitics = new Mongo.Collection("bruteforcePolitics");

getMaxLoginAttemptsPerIp = function(){
	return BruteforcePolitics.findOne().maxLoginAttemptsPerIp;
}

setMaxLoginAttemptsPerIp = function(maxLoginAttempts){
	var id = BruteforcePolitics.findOne()._id;
	BruteforcePolitics.update({"_id": id}, {$set: {"maxLoginAttemptsPerIp": maxLoginAttempts}});
}

getAuthDelayAfterMaxAttempts = function(){
	return BruteforcePolitics.findOne().authDelayAfterMaxAttempts;
}

setAuthDelayAfterMaxAttempts = function(authDelay){
	var id = BruteforcePolitics.findOne()._id;
	BruteforcePolitics.update({"_id": id}, {$set: {"authDelayAfterMaxAttempts": authDelay}});
}

Meteor.startup(function(){
	//If not set, set the ones in settings.json
	if(BruteforcePolitics.find({}).count() == 0){
		var politic = {
			maxLoginAttemptsPerIp: Meteor.settings.bruteforcePolitics.maxLoginAttemptsPerIp,
			authDelayAfterMaxAttempts: Meteor.settings.bruteforcePolitics.authDelayAfterMaxAttempts,
		}
		BruteforcePolitics.insert(politic);
	}
	
});