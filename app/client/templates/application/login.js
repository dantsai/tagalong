Template.login.events({
	'click #login' : function () {
		var textbox;
		$('input').each(function(){
		    if ($(this).val() == '') {
		    	textbox = this;
		    	return false;
		    }

		})

		if ( textbox ) {
			textbox.focus();
			return false;
		}

		Meteor.loginWithPassword($('#login-email').val(), $('#login-password').val(), function(error) { 	
			if ( error ) {
				$('#login-password').focus();
				return alert(error.reason);
			}
			Router.go('home');
		});

	}
})