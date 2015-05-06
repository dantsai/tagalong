Template.activityFeedback.helpers({

	notHost: function() {		
		return this.host._id === Meteor.userId(); 
	},
	getTimeLength: function(duration,max) {
		var aprox = (duration/max)*100 ;
		return aprox +"%";
	},
	getUserPicUrl: function() {
		user = Meteor.users.findOne(this.host._id)
		return user.profile.names.pic;
	},
	friendCount: function() {
		return this.tagalongs.length;
	}
})

Template.activityFeedback.events({
	'click #dismissBtn': function() {
		Meteor.call('removeFirstFeedback');

		// Router.go('layout');
	},
	'click #message-self': function() {
		//ADD CODE TO RECORD VIDEO HERE
		
		// just as a test of camera functionality

		// alert('camera...')
		// console.log('camera...')
		// console.log(this);
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
	                // console.log('Upload success: ' + result.responseCode);
	                // console.log(result.bytesSent + ' bytes sent');
	                // console.log('Upload success: ' + result.responseCode);
	                // console.log('response: ' + result.response); // url of video. SAVE THIS
	                // console.log(result.bytesSent + ' bytes sent');

					var message = { 'activity_id': this._id,
									'activity_type': this.type,	                				
			    					'url' : result.response
								}

				    Meteor.call('addMessageToSelf', message);
				    // Meteor.call('addMessageToActivity', result.response);   
	                
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
})