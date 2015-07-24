Template.adminlab.helpers({
	logs: function(){
		return Logs.find({},{sort: {time: -1}}, {limit: 10});
	}
});

Template.adminlab.onRendered(function(){
	this.subscribe("logs");
});

Template.adminlab.events({

});