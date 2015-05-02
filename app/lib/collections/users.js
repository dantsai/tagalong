Meteor.methods({
	setPreferences: function (userActivities) {

		Meteor.users.update(userActivities.user, 
			{ $set: 
				{ activities: userActivities.prefs } 
			}
		)
	},
	updateProfilePic: function (pic_url) {
		Meteor.users.update(Meteor.userId(), 
			{ $set: 
				{ 'profile.names.pic': pic_url }
			}
		)
	},
	addMessageToSelf: function (message) {
		Meteor.users.update(Meteor.userId(), {
			$addToSet: {messages: message}
		})
	},
	addNotification: function (notification) {
		Meteor.users.update(Meteor.userId(), {
			$addToSet: {notifications: notification}
		})		
	}
});