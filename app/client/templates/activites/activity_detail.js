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
	'click #tagalong': function(event) {
		Meteor.call('tagalong', this._id)

		var name = Meteor.user().profile.names.first + ' ' + Meteor.user().profile.names.last
		var notification = { message: name + ' is tagging along ' + this.type,
							 _id: this._id }
		
		Meteor.call('addNotification', notification, this.host._id)

		var notification = { message: name + ' is tagging along ' + this.host.name + ' ' + this.type,
							_id: this._id }			

		this.tagalongs.forEach(function(taggee) {
			console.log(taggee)
			Meteor.call('addNotification', notification, taggee)
		})

	},
	'click #message-self': function(event) {
		// just as a test of camera functionality

		// alert('camera...')
		console.log('camera...')
		// console.log(Meteor.userId());
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

					var message = { 'activity_id': this._id,
									'activity_type': this.type,	                				
			    					'messageUrl' : result.response
								}

				    Meteor.call('addMessageToSelf', message);
				    Meteor.call('addMessageToActivity', result.response);   
	                // var msgId = Messages.insert(message);
	                //place to store the url for video.
	            },
	            function(error) {
	                alert('Error uploading file ' + path + ': ' + error.code + '. source: ' + error.source + '. target: ' + error.target);
	            },
	            { fileName: name });   
	    }

		// start video capture
		navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});
	},
	'click #activity-cancel': function(event,template) {
		var actId = this._id;
		var tagalongs = this.tagalongs;
		var notification = { message: this.host.name + ' cancelled ' + this.type }
		IonActionSheet.show({
	      titleText: 'Are you sure you want to Cancel the activity?',
	      buttons: [
	        { text: 'Yes, Cancel <i class="icon ion-ios-cancel"></i>' },
	      ],
	      cancelText: 'No, take me back!',
	      buttonClicked: function(index) {
	        if (index === 0) {
	          	console.log('Canceled');
				
				tagalongs.forEach(function(taggee) {
					Meteor.call('addNotification', notification, taggee)
				});		

				Meteor.call('activityCancel', this._id);
				Router.go('tagalongs');
	        }
	        return true;
	      }
	    });
	},
	'click #activity-flake': function(event,template) {
		var actId = this._id;
		var host = this.host.name;
		var hostId = this.host._id;
		var actType = this.type;
		IonActionSheet.show({
	      titleText: 'Bail on '+host+ '?',
	      buttons: [
	        { text: 'Yes, bail. <i class="icon ion-ios-cancel"></i>' },
	      ],
	      cancelText: 'No, take me back!',
	      buttonClicked: function(index) {
	      	// console.log(this)
	        if (index === 0) {
				Meteor.call('activityFlake', actId);
				
				var name = Meteor.user().profile.names.first + ' ' + Meteor.user().profile.names.last
				var notification = { message: name + ' bailed on ' + actType,
									 _id: actId }
				
				Meteor.call('addNotification', notification, hostId)

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
}

function takePhoto(activityId) {
	//passing the activity as a parameter so you can access the id.

	// alert('camera...')
	console.log('Photo...')
	console.log(activityId);
	console.log(Meteor.userId());

	//ADD CODE FOR TAKING PHOTO HERE.
  
}

Meteor.startup(function () {
	if(Meteor.isClient) {
		GoogleMaps.load();
	}
});