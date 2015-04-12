Template.registerHelper('prettifyDate', function(context, options) {
  if(context)
    return moment(context).format('MMM, DD, YYYY');
});

Template.registerHelper('formatDate', function(context, options) {
  if(context)
    return moment(context).format('YYYY-MM-DD');
});