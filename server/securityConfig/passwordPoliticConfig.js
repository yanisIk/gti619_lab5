Accounts.validateNewUser(function (user) {
  var loggedInUser = Meteor.user();

  if (!Roles.userIsInRole(loggedInUser, ['admin'])) {
	  throw new Meteor.Error(403, "Not authorized to create new users");
  }
  
  if (!user.username && user.username.length < 3){
  	throw new Meteor.Error(403, "Username must have at least 3 characters");
  }
 
  if(user.password){
    if(!isPasswordOk(user.password)){
      throw new Meteor.Error(403, "Password is invalid");
    }
  }

  return true;
});

Meteor.methods({
	"isUsernameAvailable": function(username){
		if(Meteor.users.find({"username": username}).count() == 0){
			return true;
		}
		return false;
	},
  "createUser": function(username, email, role, authPassword){
    check(username, String);
    check(email, String);
    check(role, String);
    check(authPassword, String);

    if(!this.userId){
      throw new Meteor.Error(403, "You must login as admin first");
    }
    if(!Roles.userIsInRole(this.userId, ['admin'])){
      throw new Meteor.Error(403, "Not authorized to create new users");
    }
    var username = Meteor.users.findOne(this.userId).username;
    if (!ApiPassword.validate({username: username, password: authPassword})) {
      throw new Meteor.Error(403, "ReAuth password invalid");
    }

    //Validate args
    if(!Meteor.call("isUsernameAvailable", username)){
      throw new Meteor.Error(500, "Username is already taken");
    }
    //The other validations will occur in the Accounts.validateNewUser function
    var userId = Accounts.createUser({username: username, email: email});
    Meteor.call("addUserToRoles", userId,[role]);
    Accounts.sendEnrollmentEmail(userId);

  }
});