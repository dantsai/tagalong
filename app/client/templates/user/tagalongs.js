Template.tagalongs.helpers({
	selectedFilter : function(option) {
		if(option == Session.get('myActivitiesFilter'))
			return 'selected';
	},

	activityDisplay: function () {
		now = new Date();
		date_now = now.setSeconds(0);
		var activities;

		if (Session.get('myActivitiesFilter') == 'Upcoming') {
			activities = Activities.find(
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
					} 
			});
		}
		else {
			activities = Activities.find(
				{ $and : [ { 'time.date' : { $lt: new Date() } },
						{ $or: [ {'host._id': Meteor.userId() },
							{ 'tagalongs': Meteor.userId() }
							]
						}
					]
				},
				{ 
					// sort : { 'time.time': -1 } 
					sort : { 
						'time.date': -1, 
						'time.time': 1
					}
				}
			);

		}
		console.log(activities.fetch());
		return groupActivities(activities);
	},

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
	}
});

Template.tagalongs.events({
	'click .pillMenu li': function(event) {	
		var selection = $(event.currentTarget);	
		if(!selection.hasClass('selected')) {
			$(".pillMenu li").removeClass('selected');	
			selection.toggleClass('selected');
			Session.set('myActivitiesFilter',selection.text());
		}
	}
})



