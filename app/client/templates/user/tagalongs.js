Template.tagalongs.helpers({
	activitiesUpcoming: function () {

		now = new Date();
		date_now = now.setSeconds(0);

		var activities = Activities.find(
			{ $and : [ { 'time.date' : { $gte: new Date(date_now) } },
					{ $or: [ {'host._id': Meteor.userId()},
						{ 'tagalongs': Meteor.userId()}
						]
					}
				]
			},
			{ sort : 
				{ 'time.date': 1}  
			}
		);

		var grouped_obj = {}
		activities.forEach(function(activity) {
			if (grouped_obj.hasOwnProperty(moment(activity.time.date).format('MMMDDYYYY'))) {
				grouped_obj[moment(activity.time.date).format('MMMDDYYYY')].activities.push(activity);	
			}
			else {
				grouped_obj[moment(activity.time.date).format('MMMDDYYYY')] = {
					'name' : moment(activity.time.date).format('MMMM, DD, YYYY'),
					'activities': [activity] 
				};
			}
		});

		var grouped_activities = $.map(grouped_obj, function(value, index) {
		    return [value];
		});
		
		return grouped_activities
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
		// console.log(this);
		var name = this.host.name.split(" ");
		return '/img/'+name[0]+'.jpg';
	},
	getTimeLength: function() {
		var aprox = (this.duration/3)*100 ;
		return aprox +"%";
	}
})

