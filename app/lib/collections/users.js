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
	}
});