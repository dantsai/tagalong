Meteor.startup(function () {
	var oneHour = 3600000;
	var thirtyMinutes = 1800000;
	Meteor.setInterval( function () {
        now = new Date();
        if (now.getHours() == 22) {
        	dateStart = new Date();
        	dateStart.setDate(dateStart.getDate() + 1);
        	dateStart.setHours(0);
        	dateStart.setMinutes(0);
        	dateEnd = new Date();
        	dateEnd.setDate(dateEnd.getDate() + 1);
        	dateEnd.setHours(23);
        	dateEnd.setMinutes(59);

        	var activitiesForReminders = Activities.find(
        			{ 'available': true , 
        			  'time.date' : { $gte: dateStart  , $lt: dateEnd } 
        			}
        	);
			
			activitiesForReminders.forEach(function(activity) {
				console.log(activity._id )
				//Add reminder for host
				Meteor.users.update(activity.host._id, {
					$push: { reminders: { $each: [ activity._id ], $position: 0 } }
				});

				//Add reminders for taggees
				activity.tagalongs.forEach(function(taggee) {
					// console.log(taggee)
					Meteor.users.update(taggee, {
						$push: { reminders: { $each: [ activity._id ], $position: 0 } }
					});					
				})				
			});  
		}      
    }, oneHour );

	Meteor.setInterval( function () {
        now = new Date();
        if (now.getHours() == 22) {
        	timeStart = new Date();
        	timeStart.setMinutes(0);
        	timeEnd = new Date();
        	timeEnd.setMinutes(59);

        	var activitiesForReminders = Activities.find(
        			{ 'available': true , 
        			  'time.date' : { $gte: dateStart  , $lt: dateEnd } 
        			}
        	);
			
			activitiesForReminders.forEach(function(activity) {
				console.log(activity._id )
				//Add reminder for host
				Meteor.users.update(activity.host._id, {
					$push: { reminders: { $each: [ activity._id ], $position: 0 } }
				});

				//Add reminders for taggees
				activity.tagalongs.forEach(function(taggee) {
					// console.log(taggee)
					Meteor.users.update(taggee, {
						$push: { reminders: { $each: [ activity._id ], $position: 0 } }
					});					
				})				
			});  
		}      
    }, thirtyMinutes );

});
