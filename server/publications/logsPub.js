Meteor.publish("logsByType", function(type)){
	check(type, String);
	if(!this.userId || !Roles.userIsInRole(this.userId, ["admin"])){
      	throw new Meteor.Error(403, "unauthorized");
    }
	return Logs.find("type":type);
}

Meteor.publish("logs", function()){
	if(!this.userId || !Roles.userIsInRole(this.userId, ["admin"])){
      	throw new Meteor.Error(403, "unauthorized");
    }
	return Logs.find();
}