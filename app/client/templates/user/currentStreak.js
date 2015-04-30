Template.currentStreak.helpers({
	getTimeLength: function(duration,max) {
		var aprox = (duration/max)*100 ;
		console.log(aprox);
		return aprox +"%";
	},
	getCurrentStreak: function () {
		var streak = 6; //replace with the actual streaks of the user
		return streak;
	},
	getMaxStreak: function () {
		var max = 9; //replace with the actual streaks of the user
		return max;
	}
})