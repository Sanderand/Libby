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
    return Patrons.find({}, {
      sort: {
        last_name: 1
      }
    });
  },
});
