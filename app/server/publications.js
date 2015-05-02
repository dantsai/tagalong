Meteor.publish('activities', function() {
	return Activities.find();
});

Meteor.publish('userNameInfo', function () {
	return Meteor.users.find({}, {
		fields: {
			'profile': 1 , 
			'emails':1,
			'activities':1,
			'friends':1
		}
	});
});

Meteor.publish('messages', function() {
	return Messages.find();
})