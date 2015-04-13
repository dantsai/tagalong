Router.configure({
	layoutTemplate: 'layout',
	waitOn: function () { return Meteor.subscribe('activities');}
});

Router.route('/', {name: 'activityList'});

Router.route('activities/:_id', {
	name: 'activity',
	data: function() {return Activities.findOne(this.params._id)}
});

Router.route('edit/:_id', {
	name: 'activityEdit',
	data: function() {return Activities.findOne(this.params._id)}
});

Router.route('/add', {name: 'activityAdd'});

Router.route('/preferences', {name: 'userPreferences'});

Router.route('/my', {name: 'activitiesUser'});

Router.route('/login', {name: 'login'});

