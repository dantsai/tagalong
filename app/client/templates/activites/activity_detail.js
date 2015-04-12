Template.activity.helpers({ 
	notHost: function() {		
		return this.host._id === Meteor.userId(); 
	},

	friendCount: function() {
		console.log(this)
		if (this.tagalongs.length === 1 ) {
			return this.tagalongs.length + ' friend'
		} else {
			return this.tagalongs.length + ' friends'
		}		
	}
});

Template.activity.events({
	'click #activity-join': function(event) {
		Meteor.call('tagalong', this._id)		
	},
	'click #activity-edit': function(event) {
		Meteor.call('tagalong', this._id)		
	}
});