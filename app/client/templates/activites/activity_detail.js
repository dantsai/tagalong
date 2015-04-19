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
		// console.log(xcv);
	}	

});

Template.activity.events({
	'click #activity-join': function(event) {
		// console.log('tagging along...');
		console.log("Client side...");
		console.log(Meteor)
		Meteor.call('tagalong', this._id,Meteor.userId())		
	},
	'click #activity-edit': function(event) {
		console.log(event);
		Meteor.call('activityEdit', this._id);
	}
});