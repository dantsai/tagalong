Template.userPreferences.helpers({
	getUser: function () {
		return Meteor.user();
	},
	emailAddress: function (emails) {
		return emails['0'].address
	},
	selectedActivities: function () {
		//code to push already selected activity preferences
	},
	inActivities: function (activity) {
		var result = '';
		if ($.inArray(activity, this.activities) != -1)
			result = 'selected';
		return result;
	}
});

Template.userPreferences.events({
	'click .modal .activityIcon': function (event) {
		var selection = $(event.currentTarget);
		selection.toggleClass('selected');

	},

	'click #user-preferences-save': function(event) {	

		var activitiesSelected = $.map($('.modal .activityIcon.selected'), function(obj,i) {
			return $(obj).attr('activity');
		})

		userPrefs = {
			'user' : Meteor.userId(),
			'prefs': activitiesSelected
		}
		Meteor.call('setPreferences', userPrefs, function(error, result) { 	
			if (error)
				return alert(error.reason);
		    IonModal.close();
		});
	},
	'click #change-photo': function(event) {
		// test photo upload
		console.log("choose photo...");
		navigator.camera.getPicture(uploadPhoto,
            function(message) { console.log('get picture failed'); },
            { quality: 50, 
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
            );

		function win(result) {
		    // console.log("Code = " + r.responseCode);
		    console.log("Response = " + result.response);
		    // console.log("Sent = " + r.bytesSent);
		    // console.log(r.response);
		    
			Meteor.call('updateProfilePic', result.response), function(error, result) { 	
				if (error)
					return alert(error.reason);
			};		    
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
})

