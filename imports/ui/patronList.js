import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Patrons } from '../api/patrons.js';
import './patronList.html';

Template.patronList.onCreated(() => {
  Meteor.subscribe('patrons');
});

Template.patronList.events({
  'click .open-patron'(event) {
    const patronId = event.currentTarget.dataset.id;
    FlowRouter.go('/app/patrons/' + patronId)
  },
});

Template.patronList.helpers({
  patrons() {
    return Patrons.find({}, { sort: { createdAt: -1 } });
  },

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
