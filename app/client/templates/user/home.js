Template.home.helpers({
	friendCount: function() {
		return this.tagalongs.length;
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
							{ 'tagalongs': Meteor.userId()}
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
		return upcoming;
	}
});

Template.home.events({
	'click #logoutBtn': function() {
		console.log('logout');
		Meteor.logout();
	}
})