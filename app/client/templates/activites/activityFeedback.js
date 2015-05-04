Template.activityFeedback.helpers({

	notHost: function() {		
		return this.host._id === Meteor.userId(); 
	},
	getTimeLength: function(duration,max) {
		var aprox = (duration/max)*100 ;
		return aprox +"%";
	},
	getUserPicUrl: function() {
		user = Meteor.users.findOne(this.host._id)
		return user.profile.names.pic;
	},
	friendCount: function() {
		return this.tagalongs.length;
	}
})

Template.activityFeedback.events({
	'click #dismissBtn': function() {
		Meteor.call('removeFirstFeedback');

		// Router.go('layout');
	},
	'click #message-self': function() {
		//ADD CODE TO RECORD VIDEO HERE
	}
})