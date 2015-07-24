Meteor.startup(function(){
	// Accounts.validateLoginAttempt()
	ThrottleAccounts.login('global', 20, 1000, 'Under Heavy Load - too many login attempts');
	ThrottleAccounts.login('ip', 3, 20000, 'Only 3 Login Attempts from the same IP every 30 second');
	ThrottleAccounts.login('connection', 3, 20000, 'Only 3 Login Attempts from the same DDP connection every 30 seconds');

	// Accounts.validateNewUser()
	ThrottleAccounts.create('global', 20, 1000, 'Under Heavy Load - too many accounts created');

});


Meteor.methods({
	"setMaxLoginAttemptsPerIp": function(numberOfAttempts, authPassword){
		//check if numberOfAttemps is a positive integer
		check(numberOfAttempts, Match.Integer);
		check(authPassword, String);

		if(!numberOfAttempts > 0){
			throw new Meteor.Error(503, "numberOfAttemps must be a positive integer")
		}
		//check if loggedIn user is admin
		if(!this.userId || !Roles.userIsInRole(this.userId, ["admin"])){
      		throw new Meteor.Error(403, "unauthorized");
    	}
    	var loggedInUsername = Meteor.users.findOne(this.userId).username;
    	if (!ApiPassword.validate({username: loggedInUsername, password: authPassword})) {
      		throw new Meteor.Error(403, "ReAuth password invalid");
    	}
		//make modifications
		setMaxLoginAttemptsPerIp(numberOfAttempts);
		var delay = getAuthDelayAfterMaxAttempts();
		ThrottleAccounts.login('ip', numberOfAttempts, delay, 'too many login attempts');

	},
	"setAuthDelayAfterMaxAttempts": function(delayInSeconds, authPassword){
		//check if numberOfAttemps is a positive integer
		check(delayInSeconds, Match.Integer);
		check(authPassword, String);
		if(!numberOfAttempts > 0){
			throw new Meteor.Error(503, "delayInSeconds must be a positive integer")
		}
		//check if loggedIn user is admin
		if(!this.userId || !Roles.userIsInRole(this.userId, ["admin"])){
      		throw new Meteor.Error(403, "unauthorized");
    	}
    	var loggedInUsername = Meteor.users.findOne(this.userId).username;
    	if (!ApiPassword.validate({username: loggedInUsername, password: authPassword})) {
      		throw new Meteor.Error(403, "ReAuth password invalid");
    	}
		//make modifications
		setAuthDelayAfterMaxAttempts(delayInSeconds*1000);
		var maxLoginAttempts = getMaxLoginAttemptsPerIp();
		ThrottleAccounts.login('ip',maxLoginAttempts, delayInSeconds*1000, 'Under Heavy Load - too many login attempts');
	},
	"unlockUserAndResetPasswordByEmail": function(username, authPassword){
		check(username, String);
		check(authPassword, String);

		if(!this.userId || !Roles.userIsInRole(this.userId, ["admin"])){
      		throw new Meteor.Error(403, "unauthorized");
    	}
    	var loggedInUsername = Meteor.users.findOne(this.userId).username;
    	if (!ApiPassword.validate({username: loggedInUsername, password: authPassword})) {
      		throw new Meteor.Error(403, "ReAuth password invalid");
    	}
    	var user = Meteor.users.findOne({"username": username});
    	if(!user){
    		throw new Meteor.Error(500, "user "+username+" doesn't exist");
    	}
    	if(!user.services && !user.services['accounts-lockout'] &&
    		user.services['accounts-lockout'].unlockTime < Date.now()){
    		throw new Meteor.Error(500, "user "+username+" isn't locked");
    	}

    	Accounts.sendResetPasswordEmail(user.userId);
    	AccountsLockout.unlockAccount(user.userId);
	},
	"unlockUserAndResetPassword": function(username, password, authPassword){
		check(username, String);
		check(password, String);
		check(authPassword, String);

		if(!this.userId || !Roles.userIsInRole(this.userId, ["admin"])){
      		throw new Meteor.Error(403, "unauthorized");
    	}
    	var loggedInUsername = Meteor.users.findOne(this.userId).username;
    	if (!ApiPassword.validate({username: loggedInUsername, password: authPassword})) {
      		throw new Meteor.Error(403, "ReAuth password invalid");
    	}
    	if(!isPasswordOk(password)){
      		throw new Meteor.Error(500, "Invalid password");
    	}
    	var user = Meteor.users.findOne({"username": username});
    	if(!user){
    		throw new Meteor.Error(500, "user "+username+" doesn't exist");
    	}
    	if(!user.services && !user.services['accounts-lockout'] &&
    		user.services['accounts-lockout'].unlockTime < Date.now()){
    		throw new Meteor.Error(500, "user "+username+" isn't locked");
    	}

    	var userId = Meteor.users.findOne({"username": username})._id;
    	Accounts.setPassword(userId, password);
    	Meteor.users.update({_id: userId}, {$set: {"services.lastUpdatedPassword": new Date()}});
    	Meteor.call("logPasswordChange", userId);
    	AccountsLockout.unlockAccount(userId);
	}
});