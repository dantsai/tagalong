Template.register.events({
    'click #create-user': function(event) {
        createUser();    	
    },
    'click #create': function(event) {
        createUser();
    }
});

function createUser() {
	var textbox;
	$('.modal input').each(function(){
	    if ($(this).val() == '') {
	    	textbox = this;
	    	return false;
	    }

	})

	if ( textbox ) {
		console.log(textbox);
		textbox.focus();
		return false;
	}

    if ( $('#register-password').val() != $('#confirm-password').val() ) {
    	$('#register-password').focus();
    	return false;
    }
    
    if ( /(.+)@(.+){2,}\.(.+){2,}/.test($('#register-email').val()) ) {
    	console.log('aaa')
        Accounts.createUser({
        	email: $('#register-email').val(),
        	password: $('#register-password').val(),
        	profile: { names: {
        				first: $('#first-name').val(),
        				last: $('#last-name').val(),
        				pic: '/img/default-avatar.png'
        			}
        		}
        	},
        	function(error) { 	
				if ( error ) {
					$('#login-password').focus();
					return alert(error.reason);					
				}
			}
        );
        console.log('Tapinda');
        console.log(Meteor.user());
        IonModal.close();
        Router.go('activityList');
    }
    else {
    	$('#register-email').focus();
    	return false;
    }

}