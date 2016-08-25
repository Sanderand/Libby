import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './patronListItem.html';

Template.patronListItem.events({
  'click .patron-list-item'(event) {
    const patronId = event.currentTarget.dataset.id;
    FlowRouter.go('/app/patrons/' + patronId)
  },
});

Template.patronListItem.helpers({
  name() {
    return this.first_name + ' ' + this.last_name;
  },

  address() {
    var addressParts = [];

    if (this.street) addressParts.push(this.street);
    if (this.postal_code) addressParts.push(this.postal_code);
    if (this.city) addressParts.push(this.city);

    return addressParts.join(', ');
  },
});
