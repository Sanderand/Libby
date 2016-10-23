import { Template } from 'meteor/templating';


Template.registerHelper('fromNow', fromNow);
Template.registerHelper('formatDate', formatDate);
Template.registerHelper('serialize', serialize);
Template.registerHelper('eq', eq);
Template.registerHelper('le', le);
Template.registerHelper('maxLength', maxLength);
Template.registerHelper('inlineAddress', inlineAddress);
Template.registerHelper('selectedClass', selectedClass);
Template.registerHelper('inc', inc);
Template.registerHelper('not', not);

// implementation

function fromNow(date) {
	return moment(date).fromNow();
}

function formatDate(date) {
	return moment(date).format('DD.MM.YYYY');
}

function serialize(data) {
	return JSON.stringify(data);
}

function eq(a, b) {
	return a === b; // {{#if eq fruit 'pineapple'}}...{{/if}}
}

function le(a, b) {
	return a <= b;
}

function maxLength(val, len) {
	if (val && len) {
		len = parseInt(len);
		return (val.length > len) ? val.substr(0, len) + '...' : val;
	}
}

function inlineAddress(address) {
	if (address) {
		var addressParts = [];

		if (address.street) addressParts.push(address.street);
		if (address.postal_code) addressParts.push(address.postal_code);
		if (address.city) addressParts.push(address.city);

		return addressParts.join(', ');
	}
}

function selectedClass(a, b) {
	return a == b ? 'selected' : '';
}

function inc(value) {
	return parseInt(value) + 1;
}

function not(statement) {
	return !statement;
}
