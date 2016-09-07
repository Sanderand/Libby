import { Template } from 'meteor/templating';

// HELPER-HELPERS

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
	return a === b; // {{#if eq fruit 'pineapple'}}...{{/if}}
});

Template.registerHelper('le', (a, b) => {
	return a <= b;
});

Template.registerHelper('maxLength', (val, len) => {
	if (val && len) {
		len = parseInt(len);
		return (val.length > len) ? val.substr(0, len) + '...' : val;
	}
});

Template.registerHelper('inlineAddress', (address) => {
	if (address) {
		var addressParts = [];

		if (address.street) addressParts.push(address.street);
		if (address.postal_code) addressParts.push(address.postal_code);
		if (address.city) addressParts.push(address.city);

		return addressParts.join(', ');
	}
});

Template.registerHelper('selectedClass', (a, b) => {
	return a == b ? 'selected' : '';
});


Template.registerHelper('inc', (value) => {
	return parseInt(value) + 1;
});
