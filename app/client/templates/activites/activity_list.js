Template.activityList.helpers({
	activityDisplay: function() {

		var filter = Session.get('activityFilter');
		var activities;
		now = new Date();
		date_now = now.setSeconds(0);

		console.log(filter);
		if (filter =='All') {
			activities = Activities.find(
				{ 
					'available': true,
				  	'time.date' : 
						{ $gte: new Date(date_now) } 
				},						 
				{ 
					sort : { 
						'time.date': 1, 
						'time.time': 1
					} 
				}					
			);
		}
		else if (filter == 'New') {
			activities = Activities.find(
				{ 
					'available': true,
				  	'time.date' : { $gte: new Date(date_now) },
					'host._id' : {$ne: Meteor.userId()}
				},						 
				{ 
					sort : { 
						'time.date': 1, 
						'time.time': 1
					} 
				},
				{ $limit : 4 }
			); 
		}
		else {
			if (Meteor.user().activities.length) {
				activities = Activities.find(
					{ 
						'available': true,
					  	'time.date' : 
							{ $gte: new Date(date_now) },
					  	'type': 
					  		{ $in : Meteor.user().activities },
						'host._id' : {$ne: Meteor.userId()} 
					},						 
					{ 
						sort : { 
							'time.date': 1, 
							'time.time': 1
						} 
					}
				);
			}
			else {
				// Could return those with a lot of users.
				//return 'Set Prefs'
			}

		}
		return groupActivities(activities);
	},
	activitiesAll: function() {
		now = new Date();
		date_now = now.setSeconds(0);


		var activities= Activities.find(
			{ 'available': true,
			  'time.date' : 
					{ $gte: new Date(date_now) } 
			},						 
			{ sort : 
					{ 'time.date': 1} 
			}					
		);
		return groupActivities(activities);		
	},

	activitiesNew: function() {

		now = new Date();
		date_now = now.setSeconds(0);

		var activities = Activities.find(
			{ 'available': true,
			  'time.date' : 
					{ $gte: new Date(date_now) } 
			},						 
			{ sort : 
				{ 'createdAt': -1} 
			},
			{ $limit : 4 }
		); 

		return groupActivities(activities)
	},

	activitiesRecommend: function() {

		now = new Date();
		date_now = now.setSeconds(0);

		var activityPrefs = Meteor.user().activities
		
		if (activityPrefs) {
			var activities = Activities.find(
				{ 'available': true,
				  'time.date' : 
						{ $gte: new Date(date_now) },
				  'type': 
				  		{ $in : activityPrefs } 
				},						 
				{ sort : 
					{ 'time.date': 1, 'time.time': 1 } 
				}
			);
			// console.log(groupActivities(activities))
		}
		else {
			// Could return those with a lot of users.
			return 'Set Prefs'
		}
		// var user_activities = Meteor.users.findOne(Meteor.use)

		
	},

	getUserPicUrl: function() {
		var name = this.host.name.split(" ");
		return '/img/'+name[0]+'.jpg';
	}
});

Template.activityList.events({
	'click .pillMenu li': function(event) {	
		var selection = $(event.currentTarget);	
		// console.log(selection);
		if(!selection.hasClass('selected')) {
			$(".pillMenu li").removeClass('selected');	
			selection.toggleClass('selected');
			Session.set('activityFilter',selection.text());
		}
	}
})

Session.set('activityFilter','Recommended');

function groupActivities(activities) {
	var grouped_obj = {}
	
	activities.forEach(function(activity) {
		if (grouped_obj.hasOwnProperty(moment(activity.time.date).format('MMMDDYYYY'))) {
			grouped_obj[moment(activity.time.date).format('MMMDDYYYY')].activities.push(activity);	
		}
		else {
			grouped_obj[moment(activity.time.date).format('MMMDDYYYY')] = {
				'name' : moment(activity.time.date).format('MMMM, DD, YYYY'),
				'activities': [activity] 
			};
		}
	});

	var obj = $.makeArray(grouped_obj)

	var grouped_activities = $.map(grouped_obj, function(value, index) {
	    return [value];
	});

	// console.log(grouped_activities);
	return grouped_activities	
}
