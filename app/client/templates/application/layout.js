Template.layout.helpers({
	hasReminders: function() {
		if (Meteor.user().reminders.length>0)
			return true;
		return false;
	},
	topReminder: function() {
		var actId = Meteor.user().reminders[0];
		return Activities.findOne({_id:actId});
	},
	hasFeebacks: function() {
		if (Meteor.user().feedback.length>0)
			return true;
		return false;
	},
	topFeeback: function() {
		var actId = Meteor.user().feedback[0];
		return Activities.findOne({_id:actId});
	}
})

Template.layout.events({
	'click #logBtn': function() {
		Meteor.logout();
	}	
})