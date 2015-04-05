Template.activityList.helpers({
	activities: function () {
		return Activities.find({}, {sort: { start_time: -1 }});
	}
})