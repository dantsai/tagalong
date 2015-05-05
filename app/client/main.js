Meteor.subscribe('activities');
Meteor.subscribe('userNameInfo');
Meteor.subscribe('messages')

//Temporary use of Pablo's account
//Meteor.userId=function() {return 'p5sKnZEPTDFpTNxey'};

Session.set('headerDisplay','List');
Session.set('activitySearchQuery','');
Session.set('activityFilter','Recommended');
Session.set('myActivitiesFilter','Upcoming');
Session.set('profileSection','History');

Meteor.startup(function () {
	//console.log('startup function...');
	if(Meteor.isClient) {
		//console.log("loading google maps...");
		GoogleMaps.load();
	}
	// get location
	var onSuccess = function(position) {
	    // console.log('Latitude: '          + position.coords.latitude          + '\n' +
	    //       'Longitude: '         + position.coords.longitude         + '\n' +
	    //       'Altitude: '          + position.coords.altitude          + '\n' +
	    //       'Accuracy: '          + position.coords.accuracy          + '\n' +
	    //       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	    //       'Heading: '           + position.coords.heading           + '\n' +
	    //       'Speed: '             + position.coords.speed             + '\n' +
	    //       'Timestamp: '         + position.timestamp                + '\n');
	    latitude = position.coords.latitude;
	    longitude = position.coords.longitude;
	};

	// onError Callback receives a PositionError object
	//
	function onError(error) {
	    alert('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
	}

	navigator.geolocation.getCurrentPosition(onSuccess, onError);
});
