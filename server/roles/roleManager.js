
//Create the users at meteor startup
//TODO Wrap in Meteor.startup
 var users = [
      {name:"Administrateur",roles:['admin']},
      {name:"Utilisateur1",roles:['prepose au cercle']},
      {name:"Utilisateur1",roles:['prepose au carre']}
    ];

  _.each(users, function (user) {
    var id;

    id = Accounts.createUser({
      email: user.email,
      password: "gti619",
      profile: { name: user.name }
    });

    if (user.roles.length > 0) {
      Roles.addUsersToRoles(id, user.roles);
    }
  });


Meteor.methods({
	"addUserToRoles": function(userId, roles){
		//check if loggedIn user is admin
		//check if userId exists
		//check if roles exists
		//make modifications
	}
});