Template.activity.helpers({ 
	notHost: function() {		
		return this.host._id === Meteor.userId(); 
	},
	notTagalong: function () {
		var inTagalongs = true;
		if ($.inArray(Meteor.userId(),this.tagalongs) ==-1)
			inTagalongs = false;
		return inTagalongs;
	},
	activityMember: function () {
		var inTagalongs = true;
		if ($.inArray(Meteor.userId(),this.tagalongs) ==-1)
			inTagalongs = false;
		return (this.host._id === Meteor.userId()) || inTagalongs; 
	},
	friendCount: function() {
		if (this.tagalongs.length === 1 ) {
			return this.tagalongs.length + ' friend'
		} else {
			return this.tagalongs.length + ' friends'
		}		
	},
	taggers: function() {
		return Meteor.users.find({
			'_id': { $in: this.tagalongs } 
		});
	},
	getUserPicUrl: function() {
		var name = this.host.name.split(" ");
		return '/img/'+name[0]+'.jpg';
	}
});

Template.activity.events({
	'click #activity-join': function(event) {
		Meteor.call('tagalong', this._id, Meteor.userId())		
	},
	'click #activity-cancel': function(event) {
		Meteor.call('cancel', this._id)		
	}	
});