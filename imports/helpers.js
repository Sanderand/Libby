import { Template } from 'meteor/templating';

Template.registerHelper('fromNow', function(date) {
	return moment(date).fromNow();
});

Template.registerHelper('formatDate', function(date) {
	return moment(date).format('DD.MM.YYYY');
});

Template.registerHelper('serialize', function(data) {
	return JSON.stringify(data);
});

Template.registerHelper('eq', function(a, b) {
	//  {{#if equals fruit 'pineapple'}}...{{/if}}
	return a === b;
});
