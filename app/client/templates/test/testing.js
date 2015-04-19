users = {
	'Chalenge':'BFvTf2JCqbRgiCshX',
	'Suhaib':'zbXtjq2Evr2ymC4ew',
	'Dan': 'Sp5cuPWAqdkMjwTbe',
	'Pablo': 'p5sKnZEPTDFpTNxey'
}

Template.testing.helpers({
	getActiveUser: function() {
		var user;
		$.each(Object.keys(users), function(i,u) {			
			if (users[u] == Meteor.userId())
				user = u;
		})
		return user;
	},
	ifActiveUser: function (username) {
		var user;
		$.each(Object.keys(users), function(i,u) {			
			if (users[u] == Meteor.userId())
				user = u;
		})
		if (username == user)
			return true;
		else
			return false;
	}
});

Template.testing.events({
	'click .changeUser': function(event) {
		$('.selectedUser').toggleClass('selectedUser');
		$(event.currentTarget).toggleClass('selectedUser');
		Meteor.userId= function () {
			return users[event.currentTarget.id];
		};
	}
})