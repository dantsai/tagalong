Router.configure({
	layoutTemplate: 'layout',
	waitOn: function () { return Meteor.subscribe('activities');}
});

Router.route('/', {name: 'home'});

Router.route('activities/:_id', {
	name: 'activity',
	data: function() {return Activities.findOne(this.params._id)}
});

Router.route('edit/:_id', {
	name: 'activityEdit',
	data: function() {return Activities.findOne(this.params._id)}
});

Router.route('/add', {name: 'activityAdd'});

Router.route('/preferences', {
	name: 'preferences'
});

Router.route('/activityList', {
	name: 'activityList'
});

Router.route('/login', {
	name: 'login'
});

Router.route('/register', {
	name: 'register'
});

Router.route('/profile', {
	name: 'profile'
})

Router.route('/tagalongs',{
	name: 'tagalongs'
})

Router.route('/testing', {
	name: 'testing'
})

Router.route('/reminder/:_id', {
	name: 'activityReminder',
	data: function() { 
		return Activities.findOne(this.params._id);
	}
})
