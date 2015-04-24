Template.preferences.helpers({
	firstName: function() {
		var user = Meteor.user();
		return user.names.first
	},
	fullName: function() {
		var user = Meteor.user();
		console.log(user);
		return user.names.first + ' ' + user.names.last;
	}
});

Template.preferences.events({
	'click #preferences-edit': function(event) {		

	// 'click .activityIcon': function (event) {
			
	// 		var selection = $(event.currentTarget);
	// 		if ($(".activityIcon.selected").attr('activity') != selection.attr('activity')) {
	// 			$(".activityIcon").removeClass('selected');
	// 		}

	// 		selection.toggleClass('selected');
	// 		$(".activityTypes h5 span").text($(event.currentTarget).attr('activity')); // setting the value selected to the text in the h4

	// 		return selection.attr('activity');
	// 	},
		var user = Meteor.user();

		console.log(user);
		// console.log(user._id);
		var selectedActivities = [];

		$('input[type=checkbox]').each(function(){
		    if ($(this).prop('checked')) {
		    	console.log()
		    	selectedActivities.push($(this).attr('id'))
		    }

		})

		userPrefs = {
			'user' : user._id,
			'prefs': selectedActivities
		}
		console.log(userPrefs);
		Meteor.call('setPreferences', userPrefs, function(error, result) { 	
			if (error)
				return alert(error.reason);
		    //Temporary going to my tagalongs page. Should go to user's profile page
		    Router.go('/tagalongs');
		});
	}
})

