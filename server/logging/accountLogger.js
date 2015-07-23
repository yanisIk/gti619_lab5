Accounts.onCreateUser(function(options, user){
	var log = {
		level: "INFO",
		type: "ACCOUNT",
		action: "SIGNUP",
		username: user.username,
		time: Date.now(),
		message: "User "+user.username+" signed up at "+this.time
	}
	Logs.insert(log);
	console.log(log.message);	
	return user;
})



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
	console.log(log.message);
});



UserStatus.events.on("connectionLogout", function(fields) { 

	var log = {
		level: "INFO",
		type: "ACCOUNT",
		action: "LOGOUT",
		userId: fields.userId,
		ipAddress: fields.ipAddr,
		time: fields.logoutTime,
		message: "User "+fields.userId+" with IP "+fields.ipAddr+" logged out at "+fields.logoutTime
	}
	Logs.insert(log);	
	console.log(log.message);
});


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
		time: Date.now(),
		message: "User "+this.username+" with IP "+this.ipAddress+" failed to login at "+this.time+". Reason : "+attempt.error.reason
	}
	Logs.insert(log);	
	console.log(log.message);
})


Meteor.methods({
	"logPasswordChange" : function(userId){
		this.unblock();
		var username = Meteor.users.findOne(userId).username;
		var log = {
			level: "WARN",
			type: "ACCOUNT",
			action: "PASSWORD_CHANGE",
			username: username,
			ipAddress: this.connection.clientAddress,
			time: Date.now(),
			message: "User "+this.username+" with IP "+this.ipAddress+" changed his password at "+this.time
		}
		Logs.insert(log);	
		console.log(log.message);
	}
});
