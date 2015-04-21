Template.activityEdit.helpers({
	activity: function() {
		var template = Template.instance()
		return Activities.findOne({_id: template.data.id})
	}
})

Template.activityEdit.events({
	'click #activity-save': function(event) {
		pushToEdit(this.id);
	},

	'click #activity-edit': function(event) {
		pushToEdit(this.id);
	}
})

function pushToEdit(activityId) {
		// console.log('EDIT LINK');
		var activity = {
			'activityId': activityId,
			'properties': {
				'type': $('#type').val(),
				'location': $('#location').val(),
			    'time': {
				        'epoch': '',
				        'date': new Date($('#date').val() + ' 00:00'), //Need proper handling of this
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
			 IonModal.close();
		});

}