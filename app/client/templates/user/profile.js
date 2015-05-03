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
		var users = Meteor.users.find({_id: {$in: this.friends}}).fetch();
		// var res = [];
		// $.each(users, function(i,user) {
		// 	if (user._id != Meteor.userId())
		// 		res.push(user);
		// });
		// return res;
		return users;
	},
	getProfileSectionSelection: function(section) {
		return Session.get('profileSection') == section;
	}

});

Template.profile.events({
	"click .profileMenu ul li": function(event) {

		var selection = $(event.target);

		if ($("#profileMenu li.selected").text() != selection.text()) {
			$("#profileMenu li.selected").removeClass('selected');
			selection.toggleClass('selected');
			Session.set('profileSection',selection.text());
		}
		
	}
})
