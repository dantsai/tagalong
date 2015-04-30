var latitude = 37.871667;
var longitude = -122.272778;

Push.debug = true;

Push.allow({
    send: function(userId, notification) {
      // Allow all users to send to everybody - For test only!
      return true;
    }
});

Template.profile.helpers({
	exampleMapOptions: function() {
	  // Make sure the maps API has loaded
	  if (GoogleMaps.loaded()) {
	    // Map initialization options
	    return {
	      center: new google.maps.LatLng(latitude, longitude),
	      zoom: 8
	    };
	  }
	}
	//get map center
	// GoogleMaps.maps.exampleMap.instance.getCenter();
});

Template.profile.onCreated(function() {
	// We can use the `ready` callback to interact with the map API once the map is ready.
	GoogleMaps.ready('exampleMap', function(map) {
	  // Add a marker to the map once it's ready
	  // var marker = new google.maps.Marker({
	  //   position: map.options.center,
	  //   map: map.instance
	  // });
	});
});


Template.row.helpers({
	notificationHistory: function () {
		var query = {};
		return NotificationHistory.find(query);
	}
});

Template.profile.events({
	'click #test-camera': function(event) {
		// just as a test of camera functionality

		// alert('camera...')
		console.log('camera...')

		// success callback
	    function captureSuccess(mediaFiles) {
	        var i, len, path;
	        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
	            path = mediaFiles[i].fullPath;
	            alert(path);
	            uploadFile(mediaFiles[i]);
	        }
	    }

		// capture error callback
		function captureError(error) {
		    console.log('Error code: ' + error.code, null, 'Capture Error');
		    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
		};

	    // function : Upload files to server
	    function uploadFile(mediaFile) {
	        var ft = new FileTransfer(),
	            path = mediaFile.fullPath,
	            name = mediaFile.name;
	        var options = new FileUploadOptions();
	        options.fileName=name;
	        options.mimeType= 'video/quicktime';


	        ft.upload(path,
	            "http://dantsai.com/_/upload.php",
	            function(result) {
	                console.log('Upload success: ' + result.responseCode);
	                console.log(result.bytesSent + ' bytes sent');
	                console.log('Upload success: ' + result.responseCode);
	                console.log('response: ' + result.response); // url of video. SAVE THIS
	                console.log(result.bytesSent + ' bytes sent');
	            },
	            function(error) {
	                alert('Error uploading file ' + path + ': ' + error.code + '. source: ' + error.source + '. target: ' + error.target);
	            },
	            { fileName: name });   
	    }

		// start video capture
		navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});
	},

	'click #test-contacts': function(event) {
		// test contacts
		console.log("contacts...");
	},

	'click #test-photo': function(event) {
		// test photo upload
		console.log("choose photo...");
		navigator.camera.getPicture(uploadPhoto,
            function(message) { console.log('get picture failed'); },
            { quality: 50, 
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
            );

		function win(r) {
		    console.log("Code = " + r.responseCode);
		    console.log("Response = " + r.response);
		    console.log("Sent = " + r.bytesSent);
		    console.log(r.response);
		}

		function fail(error) {
		    console.log("An error has occurred: Code = " + error.code + '. source: ' + error.source + '. target: ' + error.target);
		    console.log("upload error source " + error.source);
		    console.log("upload error target " + error.target);
		}

        function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI("http://dantsai.com/_/upload.php"), win, fail, options, true);
        }

	},
	'click #test-notifications': function() {
		// test notifications
		console.log("sending notification..")
		Meteor.call("serverNotification");
	},
	"click #removeHistory": function () {
		Meteor.call("removeHistory");
	}


});

Meteor.startup(function () {
	if (Meteor.isClient) {
		GoogleMaps.load();
	}


	if (Meteor.isCordova) {
		window.alert = navigator.notification.alert;
	}
	console.log('startup..');
	Push.addListener('message', function(notification) {
		// Called on every message
		console.log("message listener: " + JSON.stringify(notification));
		alert(JSON.stringify(notification));

		function alertDismissed() {
			NotificationHistory.update({_id: notification.payload.historyId}, {
				$set: {
					"recievedAt": new Date()
				}
			});
		}
		alert(notification.message, alertDismissed, notification.payload.title, "Ok");
	});

	Push.addListener('token', function(token) {
	    alert(JSON.stringify(token));
	    console.log("token listener: " + JSON.stringify(token));

	    Meteor.call('raix:push-update', token, function(err, result){
	        if (err) {
	        	// alert(err);
	        	// alert(result);
	            console.log("ERROR: I am inside raix:push-update call");
	            console.log("err: " + err);
	            console.log("result: " + result);
	        } else {
	            console.log("Succesfully added: " + result);
	        }
	    });

	});


	// get location
	var onSuccess = function(position) {
	    alert('Latitude: '          + position.coords.latitude          + '\n' +
	          'Longitude: '         + position.coords.longitude         + '\n' +
	          'Altitude: '          + position.coords.altitude          + '\n' +
	          'Accuracy: '          + position.coords.accuracy          + '\n' +
	          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	          'Heading: '           + position.coords.heading           + '\n' +
	          'Speed: '             + position.coords.speed             + '\n' +
	          'Timestamp: '         + position.timestamp                + '\n');
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
