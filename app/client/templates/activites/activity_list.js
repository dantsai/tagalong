Template.activityList.helpers({
	activities: function() {
		return Activities.find(); 
	// 	return Activities.aggregate(
	// 		[
	// 			{ $group:
	// 				{
	// 					_id: { $dayOfYear: "$date"}, 
	// 					activities: { $push:  { activity: "$type",host: "$host" } }
	// 				}
	// 			}
	// 		]
	// 	);
	},

	prettifyDate: function(timestamp) {
    	return new Date(timestamp).toString('MM-dd-yyyy');
	}	
});