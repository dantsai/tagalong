Template.activityReminder.helpers({

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
	},
	hasVideos: function () {
		if (Meteor.user().videos) 
			return true;
		return false;
	},
	getSelfMessage: function() {
		return Meteor.user().videos[0];
	}
})