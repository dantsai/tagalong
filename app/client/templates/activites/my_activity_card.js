Template.myActivityCard.helpers({
	activityStatus: function() {
		if (this.time.date < new Date()) {
			return 'past';
		}
		else {
			if (this.host._id == Meteor.userId())
				return 'host';
			else 
				return 'tagalonger';
		}
	},
	friendCount: function() {
		return this.tagalongs.length;
	},
	messageCount: function() {
		return this.messages.length;
	},
	notHost: function() {		
		return this.host._id === Meteor.userId(); 
	},
	getUserPicUrl: function() {
		user = Meteor.users.findOne(this.host._id)
		return user.profile.names.pic;
	},
	getTimeLength: function() {
		var aprox = (this.duration/3)*100 ;
		return aprox +"%";
	},
	isHome: function() {
		var route = Router.current().route.getName();
		if (route == 'activityList')
			return false;
		return true; 
	}
})