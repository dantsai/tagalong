
Template.tagalongList.helpers({ 
	setHost: function () {
		var host = Meteor.users.findOne(this.host._id);
		Session.set('activityHost', host.profile.names.pic);
		tagalongs = this.tagalongs;
	}

});

Template.tagalongList.rendered = function () { 
	var hosturl = Session.get('activityHost');

	// replace host
	$('.h2in[order=0] img').attr('src',hosturl);
	$('.h2in[order=0]').parent().css('background','#49D2E9');

	personList = Meteor.users.find(
		{'_id':{$in:tagalongs}}
		).fetch();

	// replace the tagalongs with each person
	$.each(personList, function (i,t) {
		$('.h2in[order=' + (i+1) + '] img').attr('src',t.profile.names.pic);

		// make background blue
		$('.h2in[order=' + (i+1) + ']').parent().css('background','#49D2E9');
	});
};
