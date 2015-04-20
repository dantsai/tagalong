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

		var activities = Activities.find(
					{ 'time.date' : 
						{ $gte: new Date(date_now) } 
					},						 
					{ sort : 
						{ 'time.date': 1, 'time.time': 1 } 
					}					
				);
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

		var grouped_activities = $.map(grouped_obj, function(value, index) {
		    return [value];
		});
		
		// var obj = $.makeArray(grouped_obj)		
		// console.log('array:', grouped_activities)

		return grouped_activities
	},
	activitiesNew: function() {

		var activities = Activities.find(
			{ 'time.date' : 
				{ $gte: new Date() } 
			},
			{ sort : 
				{ 'createdAt': -1} 
			},
			{ $limit : 3 }
		); 
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
		console.log(obj)
		var grouped_activities = $.map(grouped_obj, function(value, index) {
		    return [value];
		});
		console.log('array:', grouped_activities)

		return grouped_activities
	},
	getUserPicUrl: function() {
		var name = this.host.name.split(" ");
		return '/img/'+name[0]+'.jpg';
	}
});

