Template.activityEdit.events({
	'click #activity-edit': function(event) {
		console.log('EDIT LINK');
		var activity = {
			'activityId': this._id,
			'properties': {
				'type': $('#type').val(),
				'location': $('#location').val(),
			    'time': {
				        'epoch': '',
				        'date': new Date($('#date').val()),
						'time': $('#time').val(),
			    	},
				'duration': $('#duration').val(),
				// 'invitations': [],
				'comments': $('#comments').val()
			}
		};

		Meteor.call('activityUpdate', activity, function(error, result) { 	
			if (error)
				return alert(error.reason);
		    Router.go('activity',  {_id: activity.activityId});
		});
	}
})

