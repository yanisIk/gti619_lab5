PasswordPolitics = new Mongo.Collection("passwordPolitics");

getMinimumCharactersNumber = function(){
	return PasswordPolitics.findOne().minimumCharactersNumber;
}

setMinimumCharactersNumber = function(number){
	var id = PasswordPolitics.findOne();
	PasswordPolitics.update("_id":id, {minimumCharactersNumber: number});
}
