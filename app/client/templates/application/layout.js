Template.layout.helpers({
	hasReminders: function() {
		if (Meteor.user().reminders.length)
			return true;
		return false;
	},
	topReminder: function() {
		var actId = Meteor.user().reminders[0];
		console.log(Meteor.user().reminders);
		// return actId
		return Activities.findOne({_id:actId});
	}
})