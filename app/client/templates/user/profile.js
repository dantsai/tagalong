Meteor.startup(function() {
	Push.debug = true;
	if (Meteor.isCordova) {
		window.alert = navigator.notification.alert;
	}

	Push.addListener('message', function(notification) {
		// Called on every message
		console.log(JSON.stringify(notification))
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
});

Template.row.helpers({
	notificationHistory: function () {
		var query = {};
		if (Session.get("checked")) {
			query = {recievedAt: {$exists: !Session.get("checked")}};
		}
		return NotificationHistory.find(query);
	}
});

Template.profile.events({
	'click #test-camera': function(event) {
		// just as a test of camera functionality

		alert('camera...')

		// success callback
	    function captureSuccess(mediaFiles) {
	        var i, len, path;
	        alert("stored success");
	        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
	            path = mediaFiles[i].fullPath;
	            alert(path);
	            uploadFile(mediaFiles[i]);
	        }
	    }

		// capture error callback
		function captureError(error) {
		    alert('Error code: ' + error.code, null, 'Capture Error');
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
	                alert('Upload success: ' + result.responseCode);
	                alert('response: ' + result.response); // url of video. SAVE THIS
	                alert(result.bytesSent + ' bytes sent');
	            },
	            function(error) {
	                alert('Error uploading file ' + path + ': ' + error.code + '. source: ' + error.source + '. target: ' + error.target);
	            },
	            { fileName: name });   
	    }



		// start video capture
		navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});

		// navigator.device.capture.captureVideo( 
		//     CaptureCB captureSuccess, CaptureErrorCB captureError, [CaptureVideoOptions options]
		// );
	},

	'click #test-contacts': function(event) {
		// test contacts
		alert("contacts...");
	},

	'click #test-photo': function(event) {
		// test photo upload
		alert("choose photo...");
		navigator.camera.getPicture(uploadPhoto,
            function(message) { alert('get picture failed'); },
            { quality: 50, 
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
            );

		function win(r) {
		    console.log("Code = " + r.responseCode);
		    console.log("Response = " + r.response);
		    console.log("Sent = " + r.bytesSent);
		    alert(r.response);
		}

		function fail(error) {
		    alert("An error has occurred: Code = " + error.code + '. source: ' + error.source + '. target: ' + error.target);
		    console.log("upload error source " + error.source);
		    console.log("upload error target " + error.target);
		}

        function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            // options.headers = {
            // 	Connection: "Close"
            // };

            // var params = new Object();
            // params.value1 = "test";
            // params.value2 = "param";

            // options.params = params;
			// options.chunkedMode = false;

            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI("http://dantsai.com/_/upload.php"), win, fail, options, true);
        }

	},
	'click #test-notifications': function(event) {
		// test notifications
		alert("sending notification..")

		Meteor.call("serverNotification");

	}

})

