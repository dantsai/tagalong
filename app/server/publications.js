Meteor.publish('activities', function() {
	return Activities.find();
		// return Activities.aggregate(
		// 	[
		// 		{ $group:
		// 			{
		// 				_id: { $dayOfYear: "$date"}, 
		// 				activities: { $push:  { activity: "$type",host: "$host" } }
		// 			}
		// 		}
		// 	]
		// );
});

Meteor.publish('userNameInfo', function () {
	return Meteor.users.find({}, {
		fields: {
			'profile': 1 , 
			'emails':1,
			'activities':1
		}
	});
});
