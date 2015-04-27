Template.activityList.helpers({
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
		user = Meteor.users.findOne(this.host._id);
		return user.profile.names.pic;
	}
});

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

	return grouped_activities	
}
