Template.userPreferences.helpers({
	getUser: function () {
		return Meteor.user();
	},
	firstName: function() {
		var user = Meteor.user();
		return Meteor.user().names.first
	},
	fullName: function() {
		return Meteor.user().names.first + ' ' + Meteor.user().names.last;
	},
	selectedActivities: function () {
		//code to push already selected activity preferences
	},
	inActivities: function (activity) {
		var result = '';
		if ($.inArray(activity, this.activities) != -1)
			result = 'selected';
		return result;
	}
});

Template.userPreferences.events({
	'click .modal .activityIcon': function (event) {
		var selection = $(event.currentTarget);
		selection.toggleClass('selected');

	},

	'click #user-preferences-save': function(event) {	

		var activitiesSelected = $.map($('.modal .activityIcon.selected'), function(obj,i) {
			return $(obj).attr('activity');
		})

		userPrefs = {
			'user' : Meteor.userId(),
			'prefs': activitiesSelected
		}
		Meteor.call('setPreferences', userPrefs, function(error, result) { 	
			if (error)
				return alert(error.reason);
		    IonModal.close();
		});
	}
})

