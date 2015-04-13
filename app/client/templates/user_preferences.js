Template.userPreferences.events({
	'click #preferences-edit': function(event) {		
		var userPreferences = {
			'running': $('#running').prop('checked'),
			'hiking': $('#hiking').prop('checked'),
			'swimming': $('#swimming').prop('checked'),
			'cycling': $('#cycling').prop('checked'),
			'basketball': $('#basketball').prop('checked')
		};

		console.log(userPreferences);
		// Meteor.call('activityUpdate', activity, function(error, result) { 	
		// 	if (error)
		// 		return alert(error.reason);
		//     Router.go('activity',  {_id: activity.activityId});
		// });
	}
})

