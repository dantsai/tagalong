Meteor.startup(function () {
	var oneHour = 3600000;
	//var oneHour = 120000;
	var tenMins = 600000;

	var skip = 0;

	function postReminders (activities) {
		activities.forEach(function(activity) {
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

	function setReminders () {		 

		//Create a reminder for activities happening  tomorrow
        now = new Date();
        if (now.getHours() == 20 || skip == 1) {
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

        	if (activitiesForReminders) {
        		postReminders( activitiesForReminders );
        	}			
		}
		
		//Create reminders for activities happening in the next hour
    	timeStart = new Date();
    	timeEnd = new Date();
    	timeEnd.setMinutes(timeEnd.getMinutes() + 60)

    	var activitiesForReminders = Activities.find(
    			{ 'available': true , 
    			  'time.date' : { $gte: timeStart  , $lt: timeEnd } 
    			}
    	);
		
    	if (activitiesForReminders) {
    		postReminders( activitiesForReminders );
    	}	

	};

	function setFeedback () {
    	timeStart = new Date();
    	timeStart.setHours(0);
    	timeStart.setMinutes(0);

    	timeEnd = new Date();

    	var activitiesPast = Activities.find(
    			{ 'available': true , 
    			  'time.date' : { $gte: timeStart  , $lt: timeEnd } 
    			}
    	);		

    	
    	timeStart = new Date();
    	timeStart.setMinutes(timeStart.getMinutes() - 10 );
		
		timeEnd = new Date();

		activitiesPast.forEach(function(activity) {
			// console.log(activity._id )
	
			var activityEnd = activity.time.date
			activityEnd.setHours(activityEnd.getHours() + Math.floor(activity.duration));
			var minutes =  ( activity.duration % 1) * 60;
			activityEnd.setMinutes(activityEnd.getMinutes() + minutes );	
			// console.log(activityEnd);
			if (activityEnd >= timeStart && activityEnd <= timeEnd) {
				//Ask feedback from host
				Meteor.users.update(activity.host._id, {
					$push: { feedback: { $each: [ activity._id ], $position: 0 } }
				});

				//Ask feedback from taggees
				activity.tagalongs.forEach(function(taggee) {
					// console.log(taggee)
					Meteor.users.update(taggee, {
						$push: { feedback: { $each: [ activity._id ], $position: 0 } }
					});					
				})								
			}
		});  		
	}

	//Run Hourly for Reminders
	Meteor.setInterval( setReminders, oneHour );

	//Run Every 10 mins For Feedback
	Meteor.setInterval( setFeedback, tenMins );

});
