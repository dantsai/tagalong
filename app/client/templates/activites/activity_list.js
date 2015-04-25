Template.activityList.helpers({
	activitiesAll: function() {
		/*
		//*** Will optimize this code for proper method calling once I get how to do it. Will also remove redundancy***
		// var activities_options = {
		// 	'search':
		// 		{ 'time.date' : 
		// 			{ $gte: new Date() } 
		// 		},
		// 	'sort':
		// 		{ sort : 
		// 			{ 'time.date': -1, 'time.time': -1 } 
		// 		}
		// }; 

		// Meteor.call('groupActivities', activities_options, function(error, result) { 	
		// 	if (error)
		// 		return alert(error.reason);
		// 	console.log(result);
		// 	grouped_activities = result;
		// 	return grouped_activities
	      	
		// });
		// console.log(grouped)
		*/
		now = new Date();
		date_now = moment(now).format('MM/DD/YYYY'); 
		time_now = now.getHours() + ':' + now.getMinutes();

		var activities= Activities.find(
			{ 'available': true,
			  'time.date' : 
					{ $gte: new Date(date_now) } 
			},						 
			{ sort : 
					{ 'time.date': 1, 'time.time': 1 } 
			}					
		);
		return groupActivities(activities);		
	},

	activitiesNew: function() {

		now = new Date();
		date_now = moment(now).format('MM/DD/YYYY'); 
		time_now = now.getHours() + ':' + now.getMinutes();

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
		date_now = moment(now).format('MM/DD/YYYY'); 
		time_now = now.getHours() + ':' + now.getMinutes();

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
			console.log(groupActivities(activities))
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

