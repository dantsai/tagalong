Activities = new Mongo.Collection('activities');

Meteor.methods({
	activityInsert: function(activityDetails) {
		var user = Meteor.user();
		var activity = _.extend(activityDetails, {
			userId: user._id, 
			activity_host: user.profile.name, 
			submitted: new Date()
		});

		var activityId = Activities.insert(activity);
		return {
			_id: activityId
		}; 
	}
});