Activities = new Mongo.Collection('activities');

Meteor.methods({
	activityInsert: function(activityDetails) {
		var user = Meteor.user();
		var activity = _.extend(activityDetails, {			
			host: {_id: user._id, name: user.emails[0].address}, 
			pictures: [],
			status: 'Available',
			tagalongs: [],
			visibility: true,			
			// submitted: new Date()
		});
		var activityId = Activities.insert(activity);
		return {
			_id: activityId
		}; 
	},

	activityUpdate: function(activityDetails) {
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
	tagalong: function(activityId) {
		this.setUserId('p5sKnZEPTDFpTNxey');

		check(this.userId, String);

		Activities.update(activityId, {
			$addToSet: {tagalongs: this.userId}
		});
	}
});