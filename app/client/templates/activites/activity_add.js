Template.activityAdd.events({
	'click #activity-add': function(event) {
		var activity = {
			'type': $('#type').val(),
			'location': $('#location').val(),
		    'time': {
			        'epoch': '',
			        'date': new Date($('#date').val()),
					'time': $('#time').val(),
		    	},
			'duration': $('#duration').val(),
			'invitations': [],
			'comments': $('#comments').val()
		};
		console.log(activity);
	// 	Meteor.call('activityInsert', activity, function(error, result) { 	
	// 		if (error)
	// 			return alert(error.reason);
	//       	Router.go('activity',  {_id: result._id});
	// 	});
	}
})

