Meteor.subscribe('activities');
Meteor.subscribe('userNameInfo');

//Temporary use of Pablo's account
//Meteor.userId=function() {return 'p5sKnZEPTDFpTNxey'};

Session.set('headerDisplay','List');
Session.set('activitySearchQuery','');
Session.set('activityFilter','Recommended');
Session.set('myActivitiesFilter','Upcoming');
Session.set('profileSection','History');