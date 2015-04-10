Template.activityEdit.events({
	'click #preferences-edit': function(event) {
		var userPreferences = {
			'running': $('#running').val(),
			'hiking': $('#hiking').val(),
			'swimming': $('#swimming').val(),
			'cycling': $('#cycling').val(),
			'basketball': $('#basketball').val(),
			'duration': $('#duration').val(),
			'comments': $('#comments').val()
		};

		Meteor.call('activityUpdate', activity, function(error, result) { 	
			if (error)
				return alert(error.reason);
		    Router.go('activity',  {_id: activity.activityId});
		});
	}
})

