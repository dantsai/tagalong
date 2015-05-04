Meteor.methods({
	setPreferences: function (userActivities) {

		Meteor.users.update(userActivities.user, 
			{ $set: 
				{ 
					activities: userActivities.activities,
					friends: userActivities.friends 
				} 
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
		console.log(message)
		Meteor.users.update(Meteor.userId(), {
			$push: { videos: { $each: [ message ], $position: 0 } }
		});
	},

	addNotification: function (notification, user) {
		Meteor.users.update(user, {
			$push: { notifications: { $each: [ notification ], $position: 0 } }
		});		
	},

	addToHistory: function (userHistory) {
		Meteor.users.update(Meteor.userId(), {
			$push: { history: { $each: [ userHistory ], $position: 0 } }
		});
	},

	updateHistory: function (activityID) {
		Meteor.users.update(
			{ '_id' : Meteor.userId(), 'history._id': activityID }, 
			{ $set: { 'history.$.attended': false } }
		);
	},

	removeFromHistory: function (userHistory, userId) {
		console.log('Here');
		Meteor.users.update(userId, {
			$pull: { history: userHistory }
		});
	},

	removeNotification: function (notification) {
		Meteor.users.update(Meteor.userId(), {
			$pull: { notifications: notification }
		})					
	},

	removeAllNotifications: function () {
		Meteor.users.update(Meteor.userId(), { $set: { notifications: [] }} )
	},
	removeFirstReminder: function() {
		Meteor.users.update(Meteor.userId(), { $pop: {reminders:-1 } });
	},
	removeFirstFeedback: function() {
		Meteor.users.update(Meteor.userId(), { $pop: {feedback:-1 } });
	}
});

// $push: { notifications: { $each: [ 50, 60, 70 ], $position: 0 } }
// Meteor.users.update(Meteor.userId(), {$push: { messages: { type: 'Running', message: '/img/Dan3.jpg', $position: 0 }}});