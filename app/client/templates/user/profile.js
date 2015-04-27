Template.profile.helpers({
	userPreferences: function() {
		return Meteor.users.findOne({'_id': Meteor.userId()});
	},
	inActivities: function (activity) {
		var result = '';
		if ($.inArray(activity, this.activities) != -1)
			result = 'selected';
		return result;
	},
	emailAddress: function (emails) {
		return emails['0'].address
	},	

	getFriends: function() {
		var users = Meteor.users.find().fetch();
		var res = [];
		$.each(users, function(i,user) {
			if (user._id != Meteor.userId())
				res.push(user);
		});
		return res;
	}
});

// Template.profile.events({
// 	"click .activityIcon": function(event) {
// 		$(event.currentTarget).toggleClass('selected');
// 	}
// })
