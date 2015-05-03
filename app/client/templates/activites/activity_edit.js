Template.activityEdit.helpers({
	activity: function() {
		var template = Template.instance();
		a = Activities.findOne({_id: template.data.id});
		console.log(a);
		return Activities.findOne({_id: template.data.id})
	},

	 // data-type="{{this.type}}" data-duration="{{this.duration}}" data-time="{{this.time.time}}" 
	 // data-date="{{this.time.date}}" data-location="{{this.location.name}}" data-comments="{{this.comments}}"

	isActivity: function(type) {
		if (this.type == type)
			return 'selected';
	},
	getActivityDate: function() {
		var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

		var date = new Date(this.time.date);
		console.log(date)
		this.activityDate = date;

		return date;


	},

	isSelectedDate: function(activity, day) {
		if (activity.time.date.toString().substring(4,15) === day.toString().substring(4,15))
			return 'selected'
	},

	getWeek: function() {
		var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

		actDay = new Date(this.time.date);
		var week =[];

		for (var i = 0; i<7; i++) {
			var day = new Date(this.time.date)
			day.setDate(actDay.getDate()+i);

			var t = {
				'day': day.getDate(),
				'weekdayShort': weekdays[day.getDay()].substring(0,3),
				'weekday': weekdays[day.getDay()],
				'month': months[day.getMonth()],
				'full': weekdays[day.getDay()] + " " + months[day.getMonth()]+", "+day.getDate(),
				'date': day
			};
			week.push(t);
		}
		console.log(week);
		return week;
	}
})

Template.activityEdit.events({
	'click #activity-save': function(event) {
		pushToEdit(this.id, this.host.name, this.tagalongs);
	},
	'click .modal .activityIcon': function (event) {
		
		var selection = $(event.currentTarget);
		if ($(".activityIcon.selected").attr('activity') != selection.attr('activity')) {
			$(".activityIcon").removeClass('selected');
		}

		selection.toggleClass('selected');
		$(".activityTypes h5 span").text($(event.currentTarget).attr('activity')); // setting the value selected to the text in the h4

		return selection.attr('activity');
	},
	'click .modal .dayofweek': function (event) {
		var selection = $(event.currentTarget);
		if ($(".dayofweek.selected").text() != selection.text()) {
			$(".dayofweek").removeClass('selected');
		}

		selection.toggleClass('selected');
		var selectedDate = $(".dayofweek.selected").attr('value');
		var prettyDate = moment(selectedDate).format('MMM, DD, YYYY')
		$(".activityDay h5 span").text(prettyDate);

	}
})

function pushToEdit(activityId, hostname,tagalongs) {
		console.log(activityId);

		var dateToSet = new Date($(".dayofweek.selected").attr('value'))
		var hourToSet = $('#activityTime').val().substring(0,2)
		var minsToSet = $('#activityTime').val().slice(-2)
		
		dateToSet.setHours(hourToSet)
		dateToSet.setMinutes(minsToSet)
		console.log(dateToSet)

		var notification = { 
				message: hostname + ' changed an activity you are tagging along',
				type: 'update',
				_id: activityId 
			}

		tagalongs.forEach(function(taggee) {
			console.log(notification)
			Meteor.call('addNotification', notification, taggee)
		});

		var activity = {
			'activityId': activityId,
			'properties': {
				'type': $(".activityIcon.selected").attr('activity'),
				'location': { 
					'name' : $('#activityLocation').val()
				},
			    'time': {
				        'epoch': '',
				        'date': dateToSet, //Need proper handling of this
						'time': $('#activityTime').val(),
			    	},
				'duration': $('#activityDuration').val(),
				// 'invitations': [],
				'comments': $('#editActivityComments').val(),
				'available': true
			}
		};

		Meteor.call('activityUpdate', activity, function(error, result) { 	
			if (error)
				return alert(error.reason);
			 IonModal.close();
		});

}