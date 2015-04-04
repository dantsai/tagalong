Router.configure({
	layoutTemplate: 'layout',
	waitOn: function () { return Meteor.subscribe('activities');}
});

Router.route('/', {name: 'activityList'});

Router.route('activities/:_id', {
	name: 'activity',
	data: function() {return Activities.findOne(this.params._id)}
});

Router.route('/add', {name: 'activityAdd'});

Router.route('/login', {name: 'login'});