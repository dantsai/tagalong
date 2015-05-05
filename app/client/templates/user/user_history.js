Template.userHistory.helpers({
	doneActivity: function() {		
		// var results = Meteor.user().history;
		// var activities = Activities.find({_id: {$in: Meteor.user().history}}).fetch();

		var results = $.map(Meteor.user().history, function(obj,i) {
			// if (obj.date < new Date()) {}
			if ('date' in obj) {
				return obj;
			}
		});
		results.sort(SortByDate);
		return results;
			
	},
	hasHistory: function() {
		var has = false;
		var results = $.map(Meteor.user().history, function(obj,i) {
			//if (obj.date < new Date()) {}
			if ('date' in obj) {
				has = true;
				return obj;
			}
				
		});

		return has;
	},
	attended: function() {
		if (this.attended)
			return 'attended';
		return 'missed';
	},
	shortDate: function() {
		//var months = ['Jan','Feb','Mar','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		return moment(this.date.getMonth()).format('MMM') + ' ' + this.date.getDate()

	},
	scrollHistory: function() {
		setTimeout(function() {
			$("#userActivityHistory").scrollLeft($("#userActivityHistory").prop("scrollWidth"));
		},300);
	},
	getStreaks: function () {
		var currentStreak = 0;
		var maxStreak = 0;		
		var now = new Date();
		var date_now = now.setSeconds(0);		
		

		//Need to change this back to history.date: lt today. This was to test functionality of streak algo.
		var user = Meteor.users.findOne({ '_id' : Meteor.userId(), 'history.date': { $lt: new Date(date_now) } });
		// console.log(user);
		if (user) {
			var userHistory = user.history;
			userHistory.sort(function (a, b) {
			 	if (a.date > b.date) {
			    	return 1;
			  	}
			  	if (a.date < b.date) {
			    	return -1;
			  	}
			  // a must be equal to b
			  return 0;
			});

			userHistory.forEach(function(tagalong) {
				if (tagalong.attended) {
					currentStreak = currentStreak + 1;
					// console.log(currentStreak)
					if (maxStreak < currentStreak) {
						maxStreak = currentStreak;
					}
				}
				else {
					currentStreak = 0;
				}

			});
		}

		// console.log(maxStreak, currentStreak);
		var streaks = { 
			currentStreak : currentStreak,
			maxStreak : maxStreak 
		};

		return streaks;
	}
});

function SortByDate(a, b){
  var aDate = a.date;
  var bDate = b.date; 
  return ((aDate < bDate) ? -1 : ((aDate > bDate) ? 1 : 0));
}