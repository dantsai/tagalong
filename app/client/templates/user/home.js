Template.home.helpers({
	friendCount: function() {
		return this.tagalongs.length;
	},
	hasNotifications: function() {
		if (Meteor.user().notifications.length) 
			return true
		return false; 
	},
	notHost: function() {		
		return this.host._id === Meteor.userId(); 
	},
	getNotificationsLength: function() {
		return Meteor.user().notifications.length;
	},
	isClickable: function() {
		var isAvailable = Activities.find({_id:this._id, available:true}).count()
		if (this.type != 'cancel' && isAvailable>0)
			return true;
		return false;
	},
	getUserPicUrl: function() {
		user = Meteor.users.findOne(this.host._id)
		return user.profile.names.pic;
	},
	getTimeLength: function(duration,max) {
		var aprox = (duration/max)*100 ;
		return aprox +"%";
	},
	upcomingTagalongs: function() {
		now = new Date();
		date_now = now.setSeconds(0);
		var upcoming = Activities.find(
			{ 
				$and : [ 
					{ 
						'time.date' : { 
						$gte: new Date(date_now)
						} 
					},
					{ 
						$or: [ 
							{'host._id': Meteor.userId()},
							{'tagalongs': Meteor.userId()}
						]
					}
				]
			},
			{ 
				sort : { 
						'time.date': 1, 
						'time.time': 1
					} ,
				limit: 3
			});
		// console.log(upcoming);
		return upcoming;
	},
	messages: function() {
		return Meteor.user().notifications
	}
});

Template.home.events({
	'click #logoutBtn': function() {
		Meteor.logout();
	},
	'click .remove-notification': function () {
		Meteor.call('removeNotification', this)
	},
	'click .clickable': function() {
		Router.go('activity',  {_id: this._id});
	},
	'click #removeNotifications': function() {
		Meteor.call('removeAllNotifications');
	}
})