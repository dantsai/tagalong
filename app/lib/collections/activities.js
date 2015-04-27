Activities = new Mongo.Collection('activities');

Meteor.methods({
	activityInsert: function(activityDetails) {
		var user = Meteor.user();

		var activity = _.extend(activityDetails, {	
			//Need to change when we use the actual user info.		
			
			host: {
				_id: user._id, 
				name: user.profile.names.first + ' ' +user.profile.names.last
				},
			pictures: [],
			status: 'Available',
			tagalongs: [],
			createdAt: new Date(),
			available: true
		});

		console.log(activity);
		var activityId = Activities.insert(activity);

		return {
			_id: activityId
		}; 
	},

	activityUpdate: function(activityDetails) {
		// console.log(activityDetails);
		Activities.update(activityDetails.activityId, {$set: activityDetails.properties})
	},

	groupActivities: function(options) {
		var weekdays = new Array(7);
		weekdays[0] = "Sunday";
		weekdays[1] = "Monday";
		weekdays[2] = "Tuesday";
		weekdays[3] = "Wednesday";
		weekdays[4] = "Thursday";
		weekdays[5] = "Friday";
		weekdays[6] = "Saturday";

		activities = Activities.find(options.search, options.sort);
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
		var grouped = [];
		for (var key in grouped_obj) grouped.push({'name':grouped_obj[key]['name'],'value':grouped_obj[key]['activities']})
		return grouped;
	},
	tagalong: function(activityId,userid) {
		// this.setUserId('p5sKnZEPTDFpTNxey');

		//this.setUserId(userid);
		check(userid, String);

		Activities.update(activityId, {
			$addToSet: {tagalongs: userid}
		});
	},
	activityCancel: function(activityId) {
		check(userid, String);

		Activities.update(activityId, {
			available: false 
		});
	},	
});