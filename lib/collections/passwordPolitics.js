PasswordPolitics = new Mongo.Collection("passwordPolitics");

getMinimumCharactersNumber = function(){
	return PasswordPolitics.findOne().minimumCharactersNumber;
}

setMinimumCharactersNumber = function(number){
	check(number, Match.Integer);
	if(number<3){
		throw new Meteor.Error("minimum number of characters must be > to 3");
	}
	var id = PasswordPolitics.findOne();
	PasswordPolitics.update({"_id":id},{$set: {"minimumCharactersNumber": number}});
}

getUseCapitalCase = function(){
	return PasswordPolitics.findOne().useCapitalCase;
}

setUseCapitalCase = function(useCapitalCase){
	check(useCapitalCase, Boolean);
	var id = PasswordPolitics.findOne();
	PasswordPolitics.update({"_id":id},{$set: {"useCapitalCase": useCapitalCase}});
}

getUseNumbers = function(){
	return PasswordPolitics.findOne().useNumbers;
}

setUseNumbers = function(useNumber){
	check(useNumbers, Boolean);
	var id = PasswordPolitics.findOne();
	PasswordPolitics.update({"_id":id},{$set: {"useNumbers": useNumbers}});
}

getUseSpecialCharacter = function(){
	return PasswordPolitics.findOne().useSpecialCharacter;
}

setUseSpecialCharacter = function(useSpecialCharacter){
	check(useSpecialCharacter, Boolean);
	var id = PasswordPolitics.findOne();
	PasswordPolitics.update({"_id":id},{$set: {"useSpecialCharacter": useSpecialCharacter}});
}

getUseTwoFactorsAuth = function(){
	return PasswordPolitics.findOne().useTwoFactorsAuth;
}

setUseTwoFactorsAuth = function(useTwoFactorsAuth){
	check(useSpecialCharacter, Boolean);
	var id = PasswordPolitics.findOne();
	PasswordPolitics.update({"_id":id},{$set: {"useTwoFactorsAuth": useTwoFactorsAuth}});
}

//In seconds
getPasswordLifetime = function(){
	return PasswordPolitics.findOne().passwordLifetime;
}

setPasswordLifetime = function(timeInSeconds){
	check(timeInSeconds, Match.Integer);
	if(timeInSeconds <= 10){
		throw new Meteor.Error(500, "password lifetime must be > 10 seconds");
	}
	var id = PasswordPolitics.findOne();
	PasswordPolitics.update({"_id":id},{$set: {"passwordLifetime": timeInSeconds}});
}

Meteor.startup(function(){
	if(Meteor.isServer){
		//If not set, set the ones in settings.json
		if(PasswordPolitics.find({}).count() == 0){
			var politic = {
				minimumCharactersNumber: Meteor.settings.passwordPolitics.minChars,
				useCapitalCase: Meteor.settings.passwordPolitics.useCapitalLetter,
				useSpecialCharacter: Meteor.settings.passwordPolitics.useSpecialCharacters,
				useNumber: Meteor.settings.passwordPolitics.useNumbers,
				useTwoFactorsAuth: Meteor.settings.passwordPolitics.useTwoFactorsAuth,
				passwordLifetime: Meteor.settings.passwordPolitics.passwordLifetime
			}
			PasswordPolitics.insert(politic);
		}
	}
	
});
