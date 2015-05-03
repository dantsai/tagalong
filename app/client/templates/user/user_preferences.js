Template.userPreferences.helpers({
	getUser: function () {
		return Meteor.user();
	},
	getUserInformation: function(id) {
		returnMeteor.users.find({_id:id});
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
	},
	isFriend: function(friendId) {
		if ($.inArray(friendId, Meteor.user().friends) != -1) 
			return true;
		return false;
	},
	getUsers: function() {
		var users = Meteor.users.find({},{
			'_id':1,
			"profile.names.first":1,
			"profile.names.last":1,
			"profile.names.pic":1
		}).fetch();
		var friends = this.friends;
		var res = [];
		friends.push(this._id);
		$.each(users, function(i,user) {
			if ($.inArray(user._id,friends) ==-1 )
				res.push(user);
		});
		return res;
	},
	getFriends: function() {
		var test = Meteor.users.find({_id: {$in: this.friends} }).fetch();
		return Meteor.users.find({_id: {$in: this.friends} });

	}
});

Template.userPreferences.events({
	'click .modal .activityIcon': function (event) {
		var selection = $(event.currentTarget);
		selection.toggleClass('selected');

	},
	'click .modal .friendAvatar': function(event) {
		$(event.currentTarget).toggleClass('selected');
	},

	'click #user-preferences-save': function(event) {	

		var activitiesSelected = $.map($('.modal .activityIcon.selected'), function(obj,i) {
			return $(obj).attr('activity');
		})

		var friendsSelected = $.map($(".modal .friendAvatar.selected"), function(obj,i) {
			return $(obj).attr('uid');
		})

		userPrefs = {
			'user' : Meteor.userId(),
			'activities': activitiesSelected,
			'friends': friendsSelected
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

