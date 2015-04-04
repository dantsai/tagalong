Template.activityAdd.events({
	'click #activity-add': function(event) {
		var activity = {
			'start_time': '1100',
			'end_time': '1500',
			'activity_type': 'Hiking',
			'location': 'RSF'
		};

		Meteor.call('activityInsert', activity, function(error, result) { // display the error to the user and abort
			if (error)
				return alert(error.reason);
	      	Router.go('activity',  {_id: result._id});
		});
	}
})

