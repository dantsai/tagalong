Template.activityAdd.events({
	'click #activity-add': function(event) {
		var activity = {
			'type': $('#type').val(),
			'location': $('#location').val(),
			'date': $('#date').val(),
			'time': $('#time').val(),
			'duration': $('#duration').val(),
			'comments': $('#comments').val()

		};

		console.log(activity);

	// 	Meteor.call('activityInsert', activity, function(error, result) { // display the error to the user and abort
	// 		if (error)
	// 			return alert(error.reason);
	//       	Router.go('activity',  {_id: result._id});
	// 	});
	}
})

