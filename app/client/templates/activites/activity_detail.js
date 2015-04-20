Template.activity.helpers({ 
	notHost: function() {		
		return this.host._id === Meteor.userId(); 
	},

	friendCount: function() {
		if (this.tagalongs.length === 1 ) {
			return this.tagalongs.length + ' friend'
		} else {
			return this.tagalongs.length + ' friends'
		}		
	},

	taggers: function() {
		// console.log(this.tagalongs)
		return Meteor.users.find({
			'_id': { $in: this.tagalongs } 
		});
	}
});

Template.activity.events({
	'click #activity-join': function(event) {
		Meteor.call('tagalong', this._id,Meteor.userId())		
	}
});