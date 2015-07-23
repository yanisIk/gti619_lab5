Accounts.onLoginFailure(function(attempt){		
	sAlert.info(attempt.error.reason);	
});

Accounts.onResetPasswordLink(function(token, done){
	//Meteor.call("logPasswordChange", userId);
	//TODO : Get the userId ....
});