Meteor.subscribe('activities');
Meteor.subscribe('userNameInfo');

//Temporary use of Pablo's account
Meteor.userId=function() {return 'p5sKnZEPTDFpTNxey'};

Session.set('activityFilter','Recommended');
Session.set('myActivitiesFilter','Upcoming');