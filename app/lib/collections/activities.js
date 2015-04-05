Activities = new Mongo.Collection('activities');

Meteor.methods({
	activityInsert: function(activityDetails) {
		var user = Meteor.user();
		var activity = _.extend(activityDetails, {			
			host: {userId: user._id, host: user.profile.name}, 
			submitted: new Date()
		});

		var activityId = Activities.insert(activity);
		return {
			_id: activityId
		}; 
	}
});