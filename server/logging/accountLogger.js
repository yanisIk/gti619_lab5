//TODO Log signup
Accounts.onCreateUser(function(options, user){
	var log = {
		level: "INFO",
		type: "ACCOUNT",
		action: "SIGNUP",
		username: user.username,
		time: new Date(),
		message: "User "+user.username+" signed up at "+fields.loginTime
	}
	Logs.insert(log);	
})


//TODO Log successful logins
UserStatus.events.on("connectionLogin", function(fields) { 

	var log = {
		level: "INFO",
		type: "ACCOUNT",
		action: "LOGIN",
		userId: fields.userId,
		ipAddress: fields.ipAddr,
		time: fields.loginTime,
		message: "User "+fields.userId+" with IP "+fields.ipAddr+" logged in at "+fields.loginTime
	}
	Logs.insert(log);	

});


//TODO Log successful logouts
UserStatus.events.on("connectionLogout", function(fields) { 

	var log = {
		level: "INFO",
		type: "ACCOUNT",
		action: "LOGOUT",
		userId: fields.userId,
		ipAddress: fields.ipAddr,
		time: fields.logoutTime,
		message: "User "+fields.userId+" with IP "+fields.ipAddr+" logged out at "+fields.loginTime
	}
	Logs.insert(log);	

});

//TODO Log failed logins
Accounts.onLoginFailure(function(attempt){
	var username = null;
	if(attempt.user){
		username = user.username;
	}
	var log = {
		level: "WARN",
		type: "ACCOUNT",
		action: "FAILED_LOGIN",
		username: username,
		ipAddress: attempt.connection.clientAddress,
		time: new Date(),
		message: "User "+this.username+" with IP "+this.ipAddress+" failed to login at "+this.time+". Reason : "+attempt.error.reason
	}
	Logs.insert(log);	
})


//TODO Log password changes

