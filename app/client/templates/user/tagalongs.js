Template.tagalongs.helpers({
	activitiesUpcoming: function () {
		return Activities.find(
			{ $and : [ { 'time.date' : { $gte: new Date() } },
					{ $or: [ {'host._id': Meteor.userId()},
						{ 'tagalongs': Meteor.userId()}
						]
					}
				]
			},
			{ sort : { 'time.time': -1 } }
		);
	},
	activitiesPast: function () {
		return Activities.find(
			{ $and : [ { 'time.date' : { $lt: new Date() } },
					{ $or: [ {'host._id': Meteor.userId() },
						{ 'tagalongs': Meteor.userId() }
						]
					}
				]
			},
			{ sort : { 'time.time': -1 } }
		);
	},
	friendCount: function() {
		return this.tagalongs.length;
	},
	notHost: function() {		
		return this.host._id === Meteor.userId(); 
	},
	getUserPicUrl: function() {
		var name = this.host.name.split(" ");
		return '/img/'+name[0]+'.jpg';
	},
	getTimeLength: function() {
		var aprox = (this.duration/3)*100 ;
		return aprox +"%";
	}
})

