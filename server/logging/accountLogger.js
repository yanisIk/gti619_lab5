Accounts.onCreateUser(function(options, user){
	var log = {
		level: "INFO",
		type: "ACCOUNT",
		action: "SIGNUP",
		username: user.username,
		time: new Date(),
		message: "User "+user.username+" signed up at "+new Date()
	}
	Logs.insert(log);
	console.log(log.message);	
	return user;
})



UserStatus.events.on("connectionLogin", function(fields) { 
	var username = Meteor.users.findOne(fields.userId).username;
	var log = {
		level: "INFO",
		type: "ACCOUNT",
		action: "LOGIN",
		username: username,
		ipAddress: fields.ipAddr,
		time: fields.loginTime,
		message: "User "+username+" with IP "+fields.ipAddr+" logged in at "+fields.loginTime
	}
	Logs.insert(log);	
	console.log(log.message);
});



UserStatus.events.on("connectionLogout", function(fields) { 
	var username = Meteor.users.findOne(fields.userId).username;
	var log = {
		level: "INFO",
		type: "ACCOUNT",
		action: "LOGOUT",
		username: username,
		ipAddress: fields.ipAddr,
		time: fields.logoutTime,
		message: "User "+username+" with IP "+fields.ipAddr+" logged out at "+fields.logoutTime
	}
	Logs.insert(log);	
	console.log(log.message);
});


Accounts.onLoginFailure(function(attempt){
	var username = null;
	if(attempt.user){
		username = attempt.user.username;
	}
	var log = {
		level: "WARN",
		type: "ACCOUNT",
		action: "FAILED_LOGIN",
		username: username,
		ipAddress: attempt.connection.clientAddress,
		time: new Date(),
		message: "User "+username+" with IP "+attempt.connection.clientAddress+" failed to login at "+new Date()+". Reason : "+attempt.error.reason
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
			time: new Date(),
			message: "User "+username+" with IP "+this.connection.clientAddress+" changed his password at "+new Date()
		}
		Logs.insert(log);	
		console.log(log.message);
	}
});
