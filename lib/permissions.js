isAdminOrCarre = function(){
	if(Roles.userIsInRole(this.userId, ["admin", "carre"])){
		return true;
	}
	else{
		return false;
	}
}

isAdminOrCercle = function(){
	if(Roles.userIsInRole(this.userId, ["admin", "cercle"])){
		return true;
	}
	else{
		return false;
	}
}

requireLogin = function() { 
  if (! Meteor.user()) {
   // If user is not logged in render landingpage
   this.render('home'); 
 } else {
   //if user is logged in render whatever route was requested
   this.next(); 
 }
}
