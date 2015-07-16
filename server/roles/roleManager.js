
//Create the users at meteor startup
 Meteor.startup(function(){
    if(Meteor.users.find("username": "administrateur").count == 1){
      return;
    }

    var users = [
        {username:"administrateur",roles:['admin']},
        {username:"utilisateur1",roles:['prepose au cercle']},
        {username:"utilisateur2",roles:['prepose au carre']}
      ];

    _.each(users, function (user) {
      var id;

      id = Accounts.createUser({
        username: user.username,
        password: "gti619",
        profile: { name: user.username }
      });

      if (user.roles.length > 0) {
        Roles.addUsersToRoles(id, user.roles);
      }
    });
 });
 


Meteor.methods({
	"addUserToRoles": function(userId, roles){
		//check if loggedIn user is admin
    if(!this.userId || !Roles.userIsInRole(this.userId, ["admin"])){
      throw new Meteor.Error(403, "unauthorized");
    }
		//check if userId exists
    if(Meteor.users.find(userId).count == 0){
      throw new Meteor.Error(503, "user not found");
    }
		//check if roles exists
    if(!roles.length > 0 || Meteor.roles.find("name":{$in:roles}).count != roles.length){
      throw new Meteor.Error(503, "One or more roles don't exist")
    }
		//make modifications
    Roles.addUsersToRoles(userId, roles);
	}
});