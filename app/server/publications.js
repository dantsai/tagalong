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