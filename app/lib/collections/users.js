// Users = new Mongo.Collection('users');

Meteor.methods({
	setPreferences: function (userActivities) {

		Meteor.users.update(userActivities.user, 
			{ $set: 
				{ activities: userActivities.prefs } 
			}
		)
	}
});