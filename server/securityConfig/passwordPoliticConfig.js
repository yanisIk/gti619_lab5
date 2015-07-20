Accounts.validateNewUser(function (user) {
  var confirm = false;

  if (user.username && user.username.length >= 3){
  	confirm = true;
  }
  else{
  	throw new Meteor.Error(403, "Username must have at least 3 characters");
  }

  if(user.password && user.password.length >= getMinimumCharactersNumber()){
  	confirm = true;
  }
  else{
  	throw new Meteor.Error(403, "Password must have at least "+getMinimumCharactersNumber+" characters");
  }


  return confirm;
});