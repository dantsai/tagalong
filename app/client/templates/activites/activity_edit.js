Template.activityEdit.helpers({
	activity: function() {
		var template = Template.instance()
		return Activities.findOne({_id: template.data.id})
	},

	isActivity: function(type) {
		if (this.type == type)
			return 'selected';
	},
	getActivityDate: function() {
		var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

		var date = new Date(this.date);

		this.activityDate = date;

		return date;


	},

	isSelectedDate: function(activity, day) {
		if (activity.date.substring(4,15) === day.toString().substring(4,15))
			return 'selected'
	},

	getWeek: function() {
		var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		actDay = new Date(this.date);
		var week =[];

		for (var i = 0; i<7; i++) {
			var day = new Date(this.date)
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
		pushToEdit(this.id);
	},

	'click #activity-edit': function(event) {
		pushToEdit(this.id);
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
		$(".activityDay h5 span").text($(".dayofweek.selected").attr('value'));

	}
})

function pushToEdit(activityId) {
		console.log(activityId);
		var activity = {
			'activityId': activityId,
			'properties': {
				'type': $(".activityIcon.selected").attr('activity'),
				'location': { 
					'name' : $('#activityLocation').val()
				},
			    'time': {
				        'epoch': '',
				        'date': new Date($(".dayofweek.selected").attr('value')), //Need proper handling of this
						'time': $('#activityTime').val(),
			    	},
				'duration': $('#activityDuration').val(),
				// 'invitations': [],
				'comments': $('#editActivityComments').val()
			}
		};

		Meteor.call('activityUpdate', activity, function(error, result) { 	
			if (error)
				return alert(error.reason);
			 IonModal.close();
		});

}