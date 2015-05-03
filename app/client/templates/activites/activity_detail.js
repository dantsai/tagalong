Template.activity.helpers({ 
	isHost: function() {		
		return this.host._id === Meteor.userId(); 
	},
	notTagalong: function () {
		var inTagalongs = true;
		if ($.inArray(Meteor.userId(),this.tagalongs) ==-1)
			inTagalongs = false;
		return inTagalongs;
	},
	hasMessages: function() {
		if (this.messages.length) 
			return true;
		return false;
	},
	scrollMessages: function() {
		setTimeout(function() {
			$(".messageArea").scrollTop($(".messageArea").prop("scrollHeight"));
		},300);
	},
	activityMember: function () {
		var inTagalongs = true;
		if ($.inArray(Meteor.userId(),this.tagalongs) ==-1)
			inTagalongs = false;
		return (this.host._id === Meteor.userId()) || inTagalongs; 
	},
	friendCount: function() {
		if (this.tagalongs.length === 1 ) {
			return this.tagalongs.length + ' friend'
		} else {
			return this.tagalongs.length + ' friends'
		}		
	},
	taggers: function() {
		return Meteor.users.find({
			'_id': { $in: this.tagalongs } 
		});
	},
	getUserPicUrl: function() {
		user = Meteor.users.findOne(this.host._id)
		return user.profile.names.pic;
	},
	exampleMapOptions: function() {
	  // Make sure the maps API has loaded
	  // console.log(this.location.position.A, this.location.position.F);

	  if (GoogleMaps.loaded()) {
	    // Map initialization options
	    return {
	      center: new google.maps.LatLng(this.location.position.A, this.location.position.F),
	      zoom: 17
	    };
	  }
	}	
});

Template.activity.onCreated(function() {
	GoogleMaps.ready('exampleMap', function(map) {
		var marker = new google.maps.Marker({
			position: map.options.center,
			map: map.instance
		});
	});
});

Template.activity.events({
	'click #submitMessage': function() {
		var msg = $('#messageInput').val();
		if (msg) { 
			var input = '['+Meteor.user().profile.names.first+'] '+msg;
			this.messages.push(input); //saving the text at the beginning of the messages array.
			var update = {
				'activityId': this._id,
				'properties': {
					'messages': this.messages
				}
			}
			Meteor.call('activityUpdate', update, function(error, result) { 	
				if (error)
					return alert(error.reason);
			});
			setTimeout(function() {
				$(".messageArea").scrollTop($(".messageArea").prop("scrollHeight"));
			},300);
			$('#messageInput').val('');
		}
	},
	'click #activity-join': function(event) {
		Meteor.call('tagalong', this._id, Meteor.userId())		
	},
	'click #activity-cancel': function(event) {
		Meteor.call('activityCancel', this._id);
		Router.go('tagalongs');
	},
	'click #activity-flake': function(event) {
		Meteor.call('activityFlake', this._id,Meteor.userId());
		// Router.go('tagalongs');
	},
	// 'click #message-self': function(event) {
	// 	// just as a test of camera functionality

	// 	// alert('camera...')
	// 	console.log('camera...')
	// 	console.log(this);
	// 	console.log(Meteor.userId());
	// 	// success callback
	//     function captureSuccess(mediaFiles) {
	//         var i, len, path;
	//         for (i = 0, len = mediaFiles.length; i < len; i += 1) {
	//             path = mediaFiles[i].fullPath;
	//             alert(path);
	//             uploadFile(mediaFiles[i]);
	//         }
	//     }

	// 	// capture error callback
	// 	function captureError(error) {
	// 	    console.log('Error code: ' + error.code, null, 'Capture Error');
	// 	    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
	// 	};

	//     // function : Upload files to server
	//     function uploadFile(mediaFile) {
	//         var ft = new FileTransfer(),
	//             path = mediaFile.fullPath,
	//             name = mediaFile.name;
	//         var options = new FileUploadOptions();
	//         options.fileName=name;
	//         options.mimeType= 'video/quicktime';


	//         ft.upload(path,
	//             "http://dantsai.com/_/upload.php",
	//             function(result) {
	//                 console.log('Upload success: ' + result.responseCode);
	//                 console.log(result.bytesSent + ' bytes sent');
	//                 console.log('Upload success: ' + result.responseCode);
	//                 console.log('response: ' + result.response); // url of video. SAVE THIS
	//                 console.log(result.bytesSent + ' bytes sent');

	//                 message = {'activity_id': this._id,
	//                 			'user': Meteor.userId(),
	//                 			'messageUrl' : result.response
	//             				}

	//                 var msgId = Messages.insert(message);
	//                 //place to store the url for video.
	//             },
	//             function(error) {
	//                 alert('Error uploading file ' + path + ': ' + error.code + '. source: ' + error.source + '. target: ' + error.target);
	//             },
	//             { fileName: name });   
	//     }

	// 	// start video capture
	// 	navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});
	// },
	'click [data-action=showCameraActionSheet]': function (event,template) {
		var actId = this._id;

		IonActionSheet.show({
	      // titleText: '',
	      buttons: [
	        { text: 'Record Video <i class="icon ion-ios-videocam"></i>' },
	        { text: 'Take Photo <i class="icon ion-ios-camera"></i>' },
	      ],
	      cancelText: 'Cancel',
	      buttonClicked: function(index) {
	        if (index === 0) {
	          recordVideo(actId);
	        }
	        if (index === 1) {
	          takePhoto(actId);
	        }
	        return true;
	      }
	    });
	}			
});

function recordVideo(activityId) {
	//passing the activity as a parameter so you can access the id.

	// alert('camera...')
	console.log('Video...')
	console.log(activityId);
	console.log(Meteor.userId());

	//ADD CODE FOR RECORDING VIDEO HERE.

	// just as a test of camera functionality

	// alert('camera...')
	console.log('camera...')
	console.log(this);
	console.log(Meteor.userId());
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

	    		// do we need to include a flag indicating if the "message to self" is a video or photo?
                message = {'activity_id': this._id,
                			'user': Meteor.userId(),
                			'messageUrl' : result.response
            				}

                var msgId = Messages.insert(message);
                //place to store the url for video.
            },
            function(error) {
                alert('Error uploading file ' + path + ': ' + error.code + '. source: ' + error.source + '. target: ' + error.target);
            },
            { fileName: name });   
    }

	// start video capture
	navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});
}

function takePhoto(activityId) {
	//passing the activity as a parameter so you can access the id.

	// alert('camera...')
	console.log('Take photo...')
	console.log(activityId);
	console.log(Meteor.userId());

	//ADD CODE FOR TAKING PHOTO HERE.
	navigator.camera.getPicture(uploadPhoto,
        function(message) { console.log('get picture failed'); },
        { quality: 50, 
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.CAMERA }
        );

	function win(r) {
	    // console.log("Code = " + r.responseCode);
	    console.log("Response = " + r.response);
	    // console.log("Sent = " + r.bytesSent);
	    // console.log(r.response);

	    // do we need to include a flag indicating if the "message to self" is a video or photo?
        message = {'activity_id': this._id,
        			'user': Meteor.userId(),
        			'messageUrl' : r.response
    				}

        var msgId = Messages.insert(message);
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
}

Meteor.startup(function () {
	if(Meteor.isClient) {
		GoogleMaps.load();
	}
});