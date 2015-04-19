Template.activityAdd.helpers({
	dateTomorrow: function() {
		now = new Date(); 
		return now.setDate(now.getDate() + 1)
	},

	defaultTime: function() {
		now = new Date(); 
		return now.getHours() + ':00'
	}
});

Template.activityAdd.events({
	'keydown #duration': function(e) {	 
	    var key = e.keyCode ? e.keyCode : e.which;
        if ( isNaN( String.fromCharCode(key) ) ) return false;	  
	},

	'click #activity-add': function(event) {

		var textbox;
		$('input').each(function(){
		    if ($(this).val() == '') {
		    	textbox = this;
		    	return false;
		    }

		})

		if ( textbox && textbox.id != 'comments' ) {
			textbox.focus();
			return false;
		}

		var user = Meteor.user();

		var activity = {
			'type': $('#type').val(),
			'location': { 
				'name' : $('#location').val()
			},
		    'time': {
			        'epoch': '',
			        'date': new Date($('#date').val() + ' 00:00'), //Need proper handling of this
					'time': $('#time').val(),
		    	},
			'duration': $('#duration').val(),
			'invitations': [],
			'public': $('#public').prop('checked'),
			'comments': $('#comments').val(),		
			//Will need to push this back to the method when the users are working
			'host': {_id: user._id, name: user.names.first + ' ' +user.names.last}
		};

		// console.log(activity);
		Meteor.call('activityInsert', activity, function(error, result) { 	
			if (error)
				return alert(error.reason);
	      	Router.go('activity',  {_id: result._id});
		});
	}
})

