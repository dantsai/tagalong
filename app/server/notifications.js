Meteor.methods({
	serverNotification: function () {

		var last = NotificationHistory.findOne({}, {sort: {addedAt: -1}});
		var badge = 1
		if (last != null) {
			badge = last.badge + 1;
		}
		NotificationHistory.insert({
			badge: badge,
			addedAt: new Date()
		}, function (error, result) {
			if (!error) {
				Push.send({
					from: 'push',
					title: 'Hello World',
					text: 'This notification has been sent from the SERVER',
					badge: badge,
					payload: {
						title: 'Hello World',
						historyId: result
					},
					query: {}
				});
			}
		});
	}
		// Push.send({
		//   from: 'Tagalong',
		//   title: 'Upcoming Tagalong',
		//   text: 'reminder: you have a tagalong tomorrow!',
		//   badge: 12,
		//   payload: {
		//   	title: "hello world title",
		//   	id: 12356
		//   },
		//   query: {
		// 	}
		// });
		// Push.send({
		// 	from: 'push',
		// 	title: 'Hello World',
		// 	text: 'This notification has been sent from the SERVER',
		// 	badge: badge,
		// 	payload: {
		// 		title: 'Hello World',
		// 		historyId: result
		// 	},
		// 	query: {}
		// });
});
