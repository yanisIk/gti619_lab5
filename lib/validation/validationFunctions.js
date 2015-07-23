isPasswordOk = function(password){
	check(password, String);
	if(password.length < getMinimumCharactersNumber){
		return false;
	}
	if(getUseCapitalCase()){
		//check if contains capital letter
	}
	if(getUseNumbers()){
		//check if contains numbers	
	}

	return true;
	
}

isUsernameAvailable = function(username){
	check(username, String);
	return Meteor.call("isUsernameAvailable", username);
}