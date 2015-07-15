// Accounts.validateLoginAttempt()
ThrottleAccounts.login('global', 20, 1000, 'Under Heavy Load - too many login attempts');
ThrottleAccounts.login('ip', 3, 1000, 'Only 3 Login Attempts from the same IP every second');
ThrottleAccounts.login('connection', 8, 10000, 'Only 8 Login Attempts from the same DDP connection every 10 seconds');

// Accounts.validateNewUser()
ThrottleAccounts.create('global', 20, 1000, 'Under Heavy Load - too many accounts created');


Meteor.methods({
	"setMaxLoginAttempts": function(numberOfAttempts){
		//check if numberOfAttemps is a positive integer
		//check if loggedIn user is admin
		//make modifications
	},
	"setAuthDelayAfterMaxAttempts": function(delayInSeconds){
		//check if numberOfAttemps is a positive integer
		//check if loggedIn user is admin
		//make modifications
	}
});