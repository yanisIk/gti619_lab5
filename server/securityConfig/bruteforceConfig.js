// Accounts.validateLoginAttempt()
ThrottleAccounts.login('global', 20, 1000, 'Under Heavy Load - too many login attempts');
ThrottleAccounts.login('ip', 3, 1000, 'Only 3 Login Attempts from the same IP every second');
ThrottleAccounts.login('connection', 8, 10000, 'Only 8 Login Attempts from the same DDP connection every 10 seconds');

// Accounts.validateNewUser()
ThrottleAccounts.create('global', 20, 1000, 'Under Heavy Load - too many accounts created');


Meteor.methods({
	"setMaxLoginAttemptsPerIp": function(numberOfAttempts){
		//check if numberOfAttemps is a positive integer
		check(numberOfAttemps, Match.Integer);
		if(!numberOfAttempts > 0){
			throw new Meteor.Error(503, "numberOfAttemps must be a positive integer")
		}
		//check if loggedIn user is admin
		if(!this.userId || !Roles.userIsInRole(this.userId, ["admin"])){
      		throw new Meteor.Error(403, "unauthorized");
    	}
		//make modifications
		setMaxLoginAttemptsPerIp(numberOfAttempts);
		var delay = getAuthDelayAfterMaxAttempts();
		ThrottleAccounts.login('ip', numberOfAttempts, `delay, 'too many login attempts');

	},
	"setAuthDelayAfterMaxAttempts": function(delayInSeconds){
		//check if numberOfAttemps is a positive integer
		check(delayInSeconds, Match.Integer);
		if(!numberOfAttempts > 0){
			throw new Meteor.Error(503, "delayInSeconds must be a positive integer")
		}
		//check if loggedIn user is admin
		if(!this.userId || !Roles.userIsInRole(this.userId, ["admin"])){
      		throw new Meteor.Error(403, "unauthorized");
    	}
		//make modifications
		setAuthDelayAfterMaxAttempts(delayInSeconds*1000);
		var maxLoginAttempts = getMaxLoginAttemptsPerIp();
		ThrottleAccounts.login('ip', ,maxLoginAttempts, delayInSeconds*1000, 'Under Heavy Load - too many login attempts');
	}
});