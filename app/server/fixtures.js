if (Activities.find().count() === 0 ) {

	Activities.insert({
	    host: {
	        _id: "BFvTf2JCqbRgiCshX",
	        name: "Chalenge Masekera"
	    },
	    type: "Squash",
	    location: {
	        name: "RSF"
	    },
	    time: {
	        epoch: '',
	        date: new Date('4/3/2015'),
	        time: '10:00'
	    },
	    tagalongs: [],
	    duration: 2,
	    pictures: [],
	    status: 'Available',
	    invitations: [],
	    visibility: true,
	    comments: ''
	});

	Activities.insert({
	    host: {
	        _id: "BFvTf2JCqbRgiCshX",
	        name: "Chalenge Masekera"
	    },
	    type: "Swimming",
	    location: {
	        name: "Hearst Pool"
	    },
	    time: {
	        epoch: '',
	        date: new Date('4/6/2015'),
	        time: '14:00'
	    },
	    tagalongs: [],
	    duration: 2.3,
	    pictures: [],
	    status: 'Available',
	    invitations: [],
	    visibility: true,
	    comments: ''
	});

	Activities.insert({
	    host: {
	        _id: "Sp5cuPWAqdkMjwTbe",
	        name: "Dan Tsai"
	    },
	    type: "Swimming",
	    location: {
	        name: "Hearst Pool"
	    },
	    time: {
	        epoch: '',
	        date: new Date('4/9/2015'),
	        time: '08:00'
	    },
	    tagalongs: [],
	    duration: 1,
	    pictures: [],
	    status: 'Available',
	    invitations: [],
	    visibility: true,
	    comments: ''
	});

	Activities.insert({
	    host: {
	        _id: "zbXtjq2Evr2ymC4ew",
	        name: "Suhaib Syaed"
	    },
	    type: "Swimming",
	    location: {
	        name: "Spieker Pool"
	    },
	    time: {
	        epoch: '',
	        date: new Date('4/11/2015'),
	        time: '15:00'
	    },
	    tagalongs: [],
	    duration: 1.5,
	    pictures: [],
	    status: 'Available',
	    invitations: [],
	    visibility: true,
	    comments: ''
	});

	Activities.insert({
	    host: {
	        _id: "p5sKnZEPTDFpTNxey",
	        name: "Pablo Arvizu"
	    },
	    type: "Running",
	    location: {
	        name: "Spieker Pool"
	    },
	    time: {
	        epoch: '',
	        date: new Date('4/11/2015'),
	        time: '19:00'
	    },
	    tagalongs: [],
	    duration: 2,
	    pictures: [],
	    status: 'Available',
	    invitations: [],
	    visibility: true,
	    comments: ''
	});

	Activities.insert({
	    host: {
	        _id: "p5sKnZEPTDFpTNxey",
	        name: "Pablo Arvizu"
	    },
	    type: "Circuit Training",
	    location: {
	        name: "RSF"
	    },
	    time: {
	        epoch: '',
	        date: new Date('4/8/2015'),
	        time: '18:00'
	    },
	    tagalongs: [],
	    duration: 1,
	    pictures: [],
	    status: 'Available',
	    invitations: [],
	    visibility: true,
	    comments: ''
	});

	Activities.insert({
	    host: {
	        _id: "p5sKnZEPTDFpTNxey",
	        name: "Pablo Arvizu"
	    },
	    type: "Hiking",
	    location: {
	        name: "Big C"
	    },
	    time: {
	        epoch: '',
	        date: new Date('4/3/2015'),
	        time: '19:03'
	    },
	    tagalongs: [],
	    duration: 3,
	    pictures: [],
	    status: 'Available',
	    invitations: [],
	    visibility: true,
	    comments: ''
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
	    "emails": [{
	        "address": "parvizu@gmail.com",
	        "verified": false
	    }]
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
	    "emails": [{
	        "address": "chalenge@gmail.com",
	        "verified": false
	    }]
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
	    "emails": [{
	        "address": "suhaib@gmail.com",
	        "verified": false
	    }]
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
	    "emails": [{
	        "address": "dan@gmail.com",
	        "verified": false
	    }]
	});
	console.log("Added user: dan@gmail.com");
}