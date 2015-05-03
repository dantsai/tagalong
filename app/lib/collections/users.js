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
		// console.log(message)
		// Meteor.users.update(Meteor.userId(), {
		// 	$push: { messages: 
		// 				{ type: message.activity_type, message: message.messageUrl }
		// 	}
		// 	$push: { messages: { $each: [ notification ], $position: 0 } }
		// 	messages: { $push: { $each: [ notification ], $position: 0 } } 			
		// });
	},
	addNotification: function (notification, user) {
		Meteor.users.update(user, {
			$push: { notifications: { $each: [ notification ], $position: 0 } }
		})		
	},
	removeNotification: function (notification) {
		Meteor.users.update(Meteor.userId(), {
			$pull: { notifications: notification }
		})					
	},
	removeAllNotifications: function () {
		Meteor.users.update(Meteor.userId(), { $unset: { notifications: "" }} )
	}
});

// $push: { notifications: { $each: [ 50, 60, 70 ], $position: 0 } }
// Meteor.users.update(Meteor.userId(), {$push: { messages: { type: 'Running', message: '/img/Dan3.jpg', $position: 0 }}});