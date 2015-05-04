Template.currentStreak.helpers({
	getTimeLength: function(duration,max) {
		var aprox = (duration/max)*100 ;
		return aprox +"%";
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
					console.log(currentStreak)
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
})