import { Template } from 'meteor/templating';

Template.registerHelper('fromNow', (date) => {
	return moment(date).fromNow();
});

Template.registerHelper('formatDate', (date) => {
	return moment(date).format('DD.MM.YYYY');
});

Template.registerHelper('serialize', (data) => {
	return JSON.stringify(data);
});

Template.registerHelper('eq', (a, b) => {
	//  {{#if equals fruit 'pineapple'}}...{{/if}}
	return a === b;
});

Template.registerHelper('maxLength', (val, len) => {
	len = parseInt(len);
	return (val.length > len) ? val.substr(0, len) + '...' : val;
});
