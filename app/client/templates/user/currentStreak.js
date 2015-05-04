Template.currentStreak.helpers({
	getTimeLength: function(duration,max) {
		var aprox = (duration/max)*100 ;
		return aprox +"%";
	},
	getCurrentStreak: function () {
		var b = 0
		
		now = new Date();
		date_now = now.setSeconds(0);		
		
		var user = Meteor.users.findOne({ '_id' : Meteor.userId(), 'history.date': { $gte: new Date(date_now) } });
		var userHistory = user.history
		// console.log(userHistory);
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
		var currentStreak = 0;
		var maxStreak = 0;
		console.log(userHistory);
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
		console.log(maxStreak, currentStreak);
		streaks = { currentStreak : currentStreak,
					maxStreak : maxStreak 
			}

		return streaks;
	},
	getMaxStreak: function () {
		var max = 9; //replace with the actual streaks of the user
		return max;
	}
})