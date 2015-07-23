
//Create the users at meteor startup
 Meteor.startup(function(){

    var users = [
        {username:"administrateur",email: 'admingti619@yopmail.com', roles:['admin']},
        {username:"utilisateur1",email: 'user1gti619@yopmail.com',roles:['prepose au cercle']},
        {username:"utilisateur2",email: 'user2gti619@yopmail.com',roles:['prepose au carre']}
      ];

    _.each(users, function (user) {
      var id;

      try{
        id = Accounts.createUser({
        username: user.username,
        email: user.email,
        password: "gti619",
        profile: { name: user.username }
         });

        if (user.roles.length > 0) {
          Roles.addUsersToRoles(id, user.roles);
        }
      }
      catch(err){
        console.log(err+" , skipping user");
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
    if(!roles.length > 0 || Meteor.roles.find({"name":{$in:roles}}).count() != roles.length){
      throw new Meteor.Error(503, "One or more roles don't exist")
    }
		//make modifications
    Roles.addUsersToRoles(userId, roles);
	},
  "updateRolesToUser": function(userId, roles){
    //check if loggedIn user is admin
    if(!this.userId || !Roles.userIsInRole(this.userId, ["admin"])){
      throw new Meteor.Error(403, "unauthorized");
    }
    //check if userId exists
    if(Meteor.users.find(userId).count == 0){
      throw new Meteor.Error(503, "user not found");
    }
    //check if roles exists
    if(!roles.length > 0 || Meteor.roles.find({"name":{$in:roles}}).count() != roles.length){
      throw new Meteor.Error(503, "One or more roles don't exist")
    }
    //make modifications
    Roles.setUserRoles(userId, []);
    Roles.setUserRoles(userId, roles);
  }
});