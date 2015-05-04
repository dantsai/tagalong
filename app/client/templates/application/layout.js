Template.layout.helpers({
	hasReminders: function() {
		if (Meteor.user().reminders.length)
			return true;
		return false;
	},
	topReminder: function() {
		var actId = Meteor.user().reminders[0];
		return Activities.findOne({_id:actId});
	},
	hasFeebacks: function() {
		if (Meteor.user().feedback.length)
			return true;
		return false;
	},
	topFeeback: function() {
		var actId = Meteor.user().feedback[0];
		return Activities.findOne({_id:actId});
	}
})