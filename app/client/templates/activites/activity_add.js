var latitude = 37.871667;
var longitude = -122.272778;

Template.activityNew.helpers({
	firstLetter: function(day) {
		return day.charAt(0);
	},
	dateTomorrow: function() {
		now = new Date(); 
		return now.setDate(now.getDate() + 1)
	},

	defaultTime: function() {
		now = new Date(); 
		return now.getHours() + 1 + ':00'
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
		return week;
	},
	activityaddMapOptions: function() {
	  // Make sure the maps API has loaded
	  if (GoogleMaps.loaded()) {
	    // Map initialization options
	    return {
	      center: new google.maps.LatLng(latitude, longitude),
	      zoom: 15
	    };
	  }
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

		var dateToSet = '';
		if ($(".dayofweek.selected").attr('value')) {
			dateToSet = new Date($(".dayofweek.selected").attr('value'));
		}
		else {
			dateToSet = new Date();
		}
		
		var hourToSet = $('#activityTime').val().substring(0,2);
		var minsToSet = $('#activityTime').val().slice(-2);
		
		console.log(dateToSet, hourToSet, minsToSet);
		dateToSet.setHours(hourToSet)
		dateToSet.setMinutes(minsToSet)
		//console.log(dateToSet)

		//Bug when user is selecting a current day. Should not set time that has passed.
		var activity = {
			'type': $(".activityIconGroup p.selected").attr('activity'),
			'location': { 
				'name' : $('#activityLocation').val(),
				'position' : GoogleMaps.maps.activityaddmap.instance.getCenter()	//get map center
			},
		    'time': {
			        'epoch': '',
			        'date': dateToSet, 
			        //Need proper handling of this
					'time': $('#activityTime').val(),
		    	},
			'duration': $('#activityDuration').val(),
			'invitations': [],
			'videos':[],
			'tagalongs':[],
			'public': true, //default to true for now.
			// 'comments': $('#activityComments').text(),
			'messages':[]					
		};

		//console.log(activity);
		Meteor.call('activityInsert', activity, function(error, result) { 	
			if (error)
				return alert(error.reason);

			//Add to user history
			var userHistory = { _id : result._id,
								type: activity.type,
								date: activity.time.date,
								attended: true
								};

			Meteor.call('addToHistory', userHistory);			

			IonModal.close()
	      	Router.go('activity',  {_id: result._id});
		});
	},

	'click .activityIconGroup p': function (event) {
		
		var selection = $(event.currentTarget);
		if ($(".activityIconGroup p.selected").attr('activity') != selection.attr('activity')) {
			$(".activityIconGroup p").removeClass('selected');
		}

		selection.toggleClass('selected');
		return selection.attr('activity');
	},

	'click .dayofweek': function (event) {
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