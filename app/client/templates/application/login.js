Template.login.events({
    'click #login': function(event) {
        Meteor.loginWithFacebook();
    },
 
    'click #logout': function(event) {
        Meteor.logout();
    }
});