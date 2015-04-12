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

	tagalong: function(activityId) {
		check(this.userId, String);

		Activities.update(activityId, {
			$addToSet: {tagalongs: this.userId}
		});
	}
});