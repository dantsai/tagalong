Meteor.publish('activities', function() {
	return Activities.find();
});

Meteor.publish('userNameInfo', function () {
	return Meteor.users.find({}, {
		fields: {
			'profile': 1 , 
			'emails':1,
			'activities':1,
			'notifications':1,
			'videos':1,
			'history': 1,
			'reminders':1,
			'friends':1,
			'feedback':1
		}
	});
});