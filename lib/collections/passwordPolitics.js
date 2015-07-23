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