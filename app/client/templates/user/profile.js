Template.profile.events({
	'click #test-camera': function(event) {
		// just as a test of camera functionality

		alert('camera...')

		// success callback
	    function captureSuccess(mediaFiles) {
	        var i, len, path;
	        alert("success");
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
	                alert('response: ' + result.response);
	                alert(result.bytesSent + ' bytes sent');
	            },
	            function(error) {
	                alert('Error uploading file ' + path + ': ' + error.code + '. source: ' + error.source + '. target: ' + error.target);
	            },
	            { fileName: name });   
	    }

			function postVideo(accessToken, fileURI) {
			  var metadata = {
			    snippet: {
			      title: "test",
			      description: "test",
			      tags: ["youtube-dmt-upload"],
			      categoryId: 21
			    },
			    status: {
			      privacyStatus: "unlisted"
			    }
			  }

			  var options = new FileUploadOptions();
			  options.fileKey = "file";
			  options.fileName = 'test';
			  // options.mimeType = "video/mp4";
			  options.mimeType = "video/quicktime";
			  options.chunkedMode = false;

			  options.headers = {
			    Authorization: "Bearer " + accessToken,
			    "Access-Control-Allow-Origin": "http://meteor.local"
			  };

			  var params = new Object();
			  params.part = Object.keys(metadata).join(',')

			  options.params = params;
			  console.log(options)
			  var ft = new FileTransfer();
			  ft.upload(fileURI, "https://www.googleapis.com/upload/youtube/v3/videos?part=snippet", win, fail, options, true);

			  ft.onprogress = function(progressEvent) {
			    if (progressEvent.lengthComputable) {
			      // console.log(progressEvent)
			      // loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
			    } else {
			      console.log('something not loading')
			        // loadingStatus.increment();
			    }
			    console.log(progressEvent.loaded / progressEvent.total);
			  };
			}

			function win(r) {
			  console.log(r)
			  console.log("Code = " + r.responseCode);
			  console.log("Response = " + r.response);
			  console.log("Sent = " + r.bytesSent);
			}

			function fail(error) {
			  console.log(error)
			    // alert("An error has occurred: Code = " + error.code);
			  console.log("upload error source " + error.source);
			  console.log("upload error target " + error.target);
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

	}
	// 'click #test-notifications': function(event) {
	// 	// test notifications

	// 	Push.send({
	// 	  from: 'Tagalong',
	// 	  title: 'Upcoming Tagalong',
	// 	  text: 'reminder: you have a tagalong tomorrow!',
	// 	  badge: 12,
	// 	  query: {
	// 		userid: '1'
	// 		}
	// 	});


})

