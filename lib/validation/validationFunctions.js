isPasswordOk = function(password){
	check(password, String);
	if(password.length < getMinimumCharactersNumber()){
		return false;
	}
	if(getUseCapitalCase()){
		//check if contains capital letter
		if(!/[A-Z]/.test(password)){
			return false;
		}
	}
	if(getUseNumbers()){
		//check if contains numbers	
		if(!/[0-9]/.test(password)){
			return false;
		}
	}
	return true;
}

isUsernameAvailable = function(username){
	check(username, String);
	return Meteor.call("isUsernameAvailable", username);
}