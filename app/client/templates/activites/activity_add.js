Template.activityNew.helpers({
	dateTomorrow: function() {
		now = new Date(); 
		return now.setDate(now.getDate() + 1)
	},

	defaultTime: function() {
		now = new Date(); 
		return now.getHours() + ':00'
	},

	getWeek: function() {
		var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		now = new Date();
		var week =[];
		for (var i = 0; i<7; i++) {
			var day = new Date()
			day.setDate(now.getDate()+i);

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
});

Template.activityNew.events({
	'keydown #duration': function(e) {	 
	    var key = e.keyCode ? e.keyCode : e.which;
        if ( isNaN( String.fromCharCode(key) ) ) return false;	  
	},

	'click #activity-add': function(event) {

		var textbox;
		$('input').each(function(){
		    if ($(this).val() == '') {
		    	textbox = this;
		    	return false;
		    }

		})

		if ( textbox && textbox.id != 'comments' ) {
			textbox.focus();
			return false;
		}

		var user = Meteor.user();

		var activity = {
			'type': $(".activityIcon.selected").attr('activity'),
			'location': { 
				'name' : $('#activityLocation').val()
			},
		    'time': {
			        'epoch': '',
			        'date': new Date($(".dayofweek.selected").attr('value')), 
			        //Need proper handling of this
					'time': $('#activityTime').val(),
		    	},
			'duration': $('#activityDuration').val(),
			'invitations': [],
			'public': true, //default to true for now.
			'comments': $('#activityComments').text(),		
			'host': {_id: user._id, name: user.names.first + ' ' +user.names.last}
		};

		// console.log(activity);
		Meteor.call('activityInsert', activity, function(error, result) { 	
			if (error)
				return alert(error.reason);
			IonModal.close()
	      	Router.go('activity',  {_id: result._id});
		});
	},

	'click .activityIcon': function (event) {
		
		var selection = $(event.currentTarget);
		if ($(".activityIcon.selected").attr('activity') != selection.attr('activity')) {
			$(".activityIcon").removeClass('selected');
		}

		selection.toggleClass('selected');
		$(".activityTypes h5 span").text($(event.currentTarget).attr('activity')); // setting the value selected to the text in the h4

		return selection.attr('activity');
	},

	'click .dayofweek': function (event) {
		var selection = $(event.currentTarget);
		if ($(".dayofweek.selected").text() != selection.text()) {
			$(".dayofweek").removeClass('selected');
		}
		selection.toggleClass('selected');
		$(".activityDay h5 span").text(selection.attr('date'));

	}

})

