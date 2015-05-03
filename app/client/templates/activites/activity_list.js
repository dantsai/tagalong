Template.activityList.helpers({
	headerDisplay: function() {
		if (Session.get('headerDisplay') == 'List') {
			return true;
		}
		return false;
	},
	getSearchQuery: function() {
		return Session.get('activitySearchQuery');
	},

	selectedFilter : function(option) {
		if(option == Session.get('activityFilter'))
			return 'selected';
	},
	hasCompleteSettings: function() {
		if (Meteor.user().activities.length && Meteor.user().friends.length)
			return true;
		return false;
	}, 
	activityDisplay: function() {
		var activities;
		now = new Date();
		date_now = now.setSeconds(0);

		if (Session.get('activityFilter') =='All') {
			activities = Activities.find(
				{ 
					'available': true,
				  	'time.date' : 
						{ $gte: new Date(date_now) },
					// 'friends': { $in : Meteor.user().friends },
					$or: [ 
						{'type': {$regex: ".*"+Session.get('activitySearchQuery')+".*"}}, 
						{'host.name' :{$regex: ".*"+Session.get('activitySearchQuery')+".*"}},
						{'location.name': {$regex: ".*"+Session.get('activitySearchQuery')+".*"}} 
					]
				},						 
				{ 
					sort : { 
						'time.date': 1, 
						'time.time': 1
					} 
				}					
			);
		}
		else if (Session.get('activityFilter') == 'New') {
			var yesterday = new Date();
			yesterday.setDate(yesterday.getDate() -1)
			activities = Activities.find(
				{ 
					'available': true,
				  	'time.date' : { $gte: new Date(date_now) },
				  	'createdAt': { $gte: new Date(yesterday)},
				  	'type': 
					  		{ $in : Meteor.user().activities },
					$and: [
						{'host._id': { $ne: Meteor.userId()} },
						{'host._id': { $in: Meteor.user().friends}}
					],
					$or: [ 
						{'type': {$regex: ".*"+Session.get('activitySearchQuery')+".*"}}, 
						{'host.name' :{$regex: ".*"+Session.get('activitySearchQuery')+".*"}} ,
						{'location.name': {$regex: ".*"+Session.get('activitySearchQuery')+".*"}} 
					]
				},						 
				{ 
					sort : { 
						'time.date': 1, 
						'time.time': 1
					} 
				},
				{ $limit : 4 }
			); 
		}
		else {
			if (Meteor.user().activities.length) {
				activities = Activities.find(
					{ 
						'available': true,
					  	'time.date' : 
							{ $gte: new Date(date_now) },
					  	'type': 
					  		{ $in : Meteor.user().activities },
						$and: [
							{'host._id': { $ne: Meteor.userId()} },
							{'host._id': { $in: Meteor.user().friends}}
						],
						$or: [ 
							{'type': {$regex: ".*"+Session.get('activitySearchQuery')+".*"}}, 
							{'host.name' :{$regex: ".*"+Session.get('activitySearchQuery')+".*"}},
							{'location.name': {$regex: ".*"+Session.get('activitySearchQuery')+".*"}}  
						] 
					},						 
					{ 
						sort : { 
							'time.date': 1, 
							'time.time': 1
						} 
					}
				);
			}
			else {
				// Could return those with a lot of users.
				//return 'Set Prefs'
			}

		}
		if (activities.count()) 
			return groupActivities(activities);
		return activities;
		
	},

	getUserPicUrl: function() {
		user = Meteor.users.findOne(this.host._id);
		return user.profile.names.pic;
	}
});

Template.activityList.events({
	'click .pillMenu li': function(event) {	
		var selection = $(event.currentTarget);	
		// console.log(selection);
		if(!selection.hasClass('selected')) {
			$(".pillMenu li").removeClass('selected');	
			selection.toggleClass('selected');
			Session.set('activityFilter',selection.text());
		}
	},
	'click #activity-search' : function(event) {
		Session.set('headerDisplay','Search');
	},
	'click #search-cancel' : function(event) {
		Session.set('headerDisplay','List');
		Session.set('activitySearchQuery','');
	},
	'input #search-activities': function (event) {
		var input = event.target.value;
		Session.set('activitySearchQuery',input);
	}
});

groupActivities = function (activities) {
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

	var obj = $.makeArray(grouped_obj)

	var grouped_activities = $.map(grouped_obj, function(value, index) {
	    return [value];
	});

	console.log(grouped_activities);
	return grouped_activities	
}
