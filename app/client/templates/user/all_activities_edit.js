Template.allActivitiesEdit.helpers({
	isActivities: function (activity) {
		var result = '';
		if (this.type == activity)
			result = 'selected';
		return result;
	}
});