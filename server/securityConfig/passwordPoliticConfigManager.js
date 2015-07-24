Accounts.validateNewUser(function (user) {

  if(this.connection != null){
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error(403, "Not authorized to create new users");  
    }
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
  "adminCreateUser": function(username, email, role, authPassword){
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
    var loggedInUsername = Meteor.users.findOne(this.userId).username;
    if (!ApiPassword.validate({username: loggedInUsername, password: authPassword})) {
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

  },
  "adminCreateUserWithPassword": function(username, password, email, role, authPassword){
    check(username, String);
    check(email, String);
    check(password, String);
    check(role, String);
    check(authPassword, String);

    if(!this.userId){
      throw new Meteor.Error(403, "You must login as admin first");
    }
    if(!Roles.userIsInRole(this.userId, ['admin'])){
      throw new Meteor.Error(403, "Not authorized to create new users");
    }
    var loggedInUsername = Meteor.users.findOne(this.userId).username;
    if (!ApiPassword.validate({username: loggedInUsername, password: authPassword})) {
      throw new Meteor.Error(403, "ReAuth password invalid");
    }
    if(!isPasswordOk(password)){
      throw new Meteor.Error(500, "Password is invalid");
    }
    //Validate args
    if(!Meteor.call("isUsernameAvailable", username)){
      throw new Meteor.Error(500, "Username is already taken");
    }

    //The other validations will occur in the Accounts.validateNewUser function
    var userId = Accounts.createUser({username: username, password: password, email: email});
    Meteor.call("addUserToRoles", userId,[role]);

  },
  "customResetPassword": function(oldPassword, newPassword){
    check(oldPassword, String);
    check(newPassword, String);
    if(!this.userId){
      throw new Meteor.Error(403, "You must login first");
    }
    if(oldPassword == newPassword){
      throw new Meteor.Error(500, "Can't reuse the same password");
    }
    if(!isPasswordOk(newPassword)){
      throw new Meteor.Error(500, "Invalid password");
    }
    var loggedInUsername = Meteor.users.findOne(this.userId).username;
    if (!ApiPassword.validate({username: loggedInUsername, password: oldPassword})) {
      throw new Meteor.Error(403, "old password invalid");
    }
    Accounts.setPassword(this.userId, newPassword);
    Meteor.users.update({_id: this.userId}, {$push: {"services.oldPasswords": oldPassword}});
    Meteor.users.update({_id: this.userId}, {$set: {"services.lastUpdatedPassword": new Date()}});
    Meteor.call("logPasswordChange", newUser._id);
  }
});

isPasswordSameAsOlders = function(userId, password){
  var oldPasswords = Meteor.users.findOne(userId).services.oldPasswords;
}
/*
Meteor.users.find({}).observe({
  changed: function(oldUser, newUser){
    var oldPassword = oldUser.services.password.bcrypt;
    var newPassword = newUser.services.password.bcrypt;
    if(oldPassword !== newPassword){
      Meteor.call("logPasswordChange", newUser._id);
      Meteor.users.update({_id: newUser._id}, {$push: {oldPasswords: newPassword}});
    }
  }
});
*/