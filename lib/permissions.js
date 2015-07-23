isAdminOrCarre = function(){
	if(Roles.userIsInRole(Meteor.userId(), ["admin","prepose au carre"])){
		this.next();
	}
	else{
		this.render('accessDenied');
	}
}

isAdminOrCercle = function(){
	if(Roles.userIsInRole(Meteor.userId(), ["admin","prepose au cercle"])){
		this.next();
	}
	else{
		this.render('accessDenied');
	}
}

isAdmin = function(){
	if(Roles.userIsInRole(Meteor.userId(), ["admin"])){
		this.next();
	}
	else{
		this.render('accessDenied');
	}
}

requireLogin = function() { 
  if (! Meteor.user()) {
   // If user is not logged in render landingpage
   Router.go("home");
 } else {
   //if user is logged in render whatever route was requested
   this.next(); 
 }
}
