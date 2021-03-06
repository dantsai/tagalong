if (Activities.find().count() === 0 ) {

	Activities.insert({
	    host: {
	        _id: "BFvTf2JCqbRgiCshX",
	        name: "Chalenge Masekera"
	    },
	    type: "Cycling",
	    "location" : {
			"name" : "RSF",
			"position" : {
				"A" : 37.85755980460739,
				"F" : -122.2449414512207
			}
		},
	    time: {
	        epoch: '',
	        date: new Date('5/5/2015 10:00'),
	        time: '10:00'
	    },
	    tagalongs: [],
	    messages:[],
	    duration: 2,
	    pictures: [],
	    status: 'Available',
	    invitations: [],
	    public: true,
	    comments: '',
	    createdAt: new Date('4/20/2015'),
	    available: true
	});

	Activities.insert({
	    host: {
	        _id: "BFvTf2JCqbRgiCshX",
	        name: "Chalenge Masekera"
	    },
	    type: "Swimming",
	    "location" : {
			"name" : "RSF",
			"position" : {
				"A" : 37.85755980460739,
				"F" : -122.2449414512207
			}
		},
	    time: {
	        epoch: '',
	        date: new Date('5/3/2015 14:00'),
	        time: '14:00'
	    },
	    tagalongs: [],
	    messages:[],
	    duration: 2.3,
	    pictures: [],
	    status: 'Available',
	    invitations: [],
	    public: true,
	    comments: '',
	    createdAt: new Date('5/1/2015'),
	    available: true
	});

	Activities.insert({
	    host: {
	        _id: "Sp5cuPWAqdkMjwTbe",
	        name: "Dan Tsai"
	    },
	    type: "Swimming",
	    "location" : {
			"name" : "RSF",
			"position" : {
				"A" : 37.85755980460739,
				"F" : -122.2449414512207
			}
		},
	    time: {
	        epoch: '',
	        date: new Date('5/2/2015 08:00'),
	        time: '08:00'
	    },
	    tagalongs: [],
	    messages:[],
	    duration: 1,
	    pictures: [],
	    status: 'Available',
	    invitations: [],
	    public: true,
	    comments: '',
	    createdAt: new Date(),
	    available: true
	});

	Activities.insert({
	    host: {
	        _id: "zbXtjq2Evr2ymC4ew",
	        name: "Suhaib Syaed"
	    },
	    type: "Swimming",
	    "location" : {
			"name" : "RSF",
			"position" : {
				"A" : 37.85755980460739,
				"F" : -122.2449414512207
			}
		},
		time: {
	        epoch: '',
	        date: new Date('5/3/2015 19:30'),
	        time: '19:30'
	    },
	    tagalongs: [],
	    messages:[],
	    duration: 1.5,
	    pictures: [],
	    status: 'Available',
	    invitations: [],
	    public: true,
	    comments: '',
	    createdAt: new Date(),
	    available: true
	});

	Activities.insert({
	    host: {
	        _id: "zbXtjq2Evr2ymC4ew",
	        name: "Suhaib Syaed"
	    },
	    type: "Swimming",
	    "location" : {
			"name" : "RSF",
			"position" : {
				"A" : 37.85755980460739,
				"F" : -122.2449414512207
			}
		},
	    time: {
	        epoch: '',
	        date: new Date('5/2/2015 19:30'),
	        time: '19:30'
	    },
	    tagalongs: [],
	    messages:[],
	    duration: 1.5,
	    pictures: [],
	    status: 'Available',
	    invitations: [],
	    public: true,
	    comments: '',
	    createdAt: new Date(),
	    available: true
	});

	Activities.insert({
	    host: {
	        _id: "p5sKnZEPTDFpTNxey",
	        name: "Pablo Arvizu"
	    },
	    type: "Running",
	    "location" : {
			"name" : "RSF",
			"position" : {
				"A" : 37.85755980460739,
				"F" : -122.2449414512207
			}
		},
	    time: {
	        epoch: '',
	        date: new Date('5/7/2015 19:00'),
	        time: '19:00'
	    },
	    tagalongs: [],
	    messages:[],
	    duration: 2,
	    pictures: [],
	    status: 'Available',
	    invitations: [],
	    public: true,
	    comments: '',
	    createdAt: new Date(),
	    available: true
	});

	Activities.insert({
	    host: {
	        _id: "p5sKnZEPTDFpTNxey",
	        name: "Pablo Arvizu"
	    },
	    type: "Soccer",
	    "location" : {
			"name" : "RSF",
			"position" : {
				"A" : 37.85755980460739,
				"F" : -122.2449414512207
			}
		},
	    time: {
	        epoch: '',
	        date: new Date('5/1/2015 18:00'),
	        time: '18:00'
	    },
	    tagalongs: [],
	    messages:[],
	    duration: 1,
	    pictures: [],
	    status: 'Available',
	    invitations: [],
	    public: true,
	    comments: '',
	    createdAt: new Date(),
	    available: true
	});

	Activities.insert({
	    host: {
	        _id: "p5sKnZEPTDFpTNxey",
	        name: "Pablo Arvizu"
	    },
	    type: "Hiking",
	    "location" : {
			"name" : "RSF",
			"position" : {
				"A" : 37.85755980460739,
				"F" : -122.2449414512207
			}
		},
	    time: {
	        epoch: '',
	        date: new Date('4/30/2015 19:03'),
	        time: '19:03'
	    },
	    tagalongs: [],
	    messages:[],
	    duration: 3,
	    pictures: [],
	    status: 'Available',
	    invitations: [],
	    public: true,
	    comments: '',
	    createdAt: new Date(),
	    available: true
	});
	console.log('Added 7 activities to DB.');
}


if (Meteor.users.find().count() === 0) {

	Meteor.users.insert({
	    "_id": "p5sKnZEPTDFpTNxey",
	    //"createdAt": ISODate("2015-04-05T05:33:36.634Z"),
	    "services": {
	        "password": {
	            "bcrypt": "$2a$10$7lfPleGhOXzJWMhjD7/.I.ptMTfQ/EWGzLkgViHmcnvimt1yD5hOK"
	        },
	        "resume": {
	            "loginTokens": []
	        }
	    },
	    "emails": [ {
	        "address": "parvizu@gmail.com",
	        "verified": false
	    }],
	    "profile" : { "names" : {
		        "first": "Pablo",
		        "last": "Arvizu",
		        "pic": "/img/Pablo.jpg"
	    	}
	    },
        "activities":[],
        "friends": [],
        "notifications": [], "feedback":[], 
        "reminders":[],
        "videos": [],
        "history": [],
	    "activities": ['Running','Swimming','Hiking','Soccer']

	}); 
	console.log("Added user: parvizu@gmail.com");

	Meteor.users.insert({
	    "_id": "BFvTf2JCqbRgiCshX",
	    //"createdAt": ISODate("2015-04-05T06:10:34.815Z"),
	    "services": {
	        "password": {
	            "bcrypt": "$2a$10$yEkxIZZfYBrE9bS8Xu0zC.P7fMjKUOtuR3nyN5HfAPagEE5likcPC"
	        },
	        "resume": {
	            "loginTokens": []
	        }
	    },
	    "emails": [ {
	        "address": "chalenge@gmail.com",
	        "verified": false
	    }],
	    "profile" : { "names" : {
		        "first": "Chalenge",
		        "last": "Masekera",
		        "pic": "/img/Chalenge.jpg"
	    	}
	    },
        "activities":[],
        "friends": [],
        "notifications": [], "feedback":[], 
        "reminders":[],
        "videos": [],
        "history": [],
	    "activities": ['Soccer','Hiking','Walking']
	});
	console.log("Added user: chalenge@gmail.com"); 

	Meteor.users.insert({
	    "_id": "zbXtjq2Evr2ymC4ew",
	    //"createdAt": ISODate("2015-04-05T06:10:49.699Z"),
	    "services": {
	        "password": {
	            "bcrypt": "$2a$10$Mny4U/P51YlJT5Gbrfx68eSzE0Uh/b.Ad6Un.UvYL4JmafQX6JfTi"
	        },
	        "resume": {
	            "loginTokens": []
	        }
	    },
	    "emails": [ {
	        "address": "suhaib@gmail.com",
	        "verified": false
	    }],
	    "profile" : { "names" : {
		        "first": "Suhaib",
		        "last": "Syaed",
		        "pic": "/img/Suhaib.jpg"
	    	}
	    },
        "activities":[],
        "friends": [],
        "notifications": [], "feedback":[], 
        "reminders":[],
        "videos": [],
        "history": [],
	    "activities": ['Running','Swimming','Cycling']
	}); 
	console.log("Added user: suhaib@gmail.com");

	Meteor.users.insert({
	    "_id": "Sp5cuPWAqdkMjwTbe",
	    //"createdAt": ISODate("2015-04-05T06:11:01.327Z"),
	    "services": {
	        "password": {
	            "bcrypt": "$2a$10$BnR/5.Ynt.YNIf70PpvfhOIcQq7Y6ffX3XzDU937z37uUVS949ubu"
	        },
	        "resume": {
	            "loginTokens": []
	        }
	    },
	    "emails": [ {
	        "address": "dan@gmail.com",
	        "verified": false
	    }],
	    "profile" : { "names" : {
		        "first": "Dan",
		        "last": "Tsai",
		        "pic": "/img/Dan.jpg"
		    }
	    },
        "activities":[],
        "friends": [],
        "notifications": [], "feedback":[], 
        "reminders":[],
        "videos": [],
        "history": [],
	    "activities": ['Running','Swimming','Cycling']
	});
	console.log("Added user: dan@gmail.com");
}