import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Patrons } from '../api/patrons.js';
import './patronListItem.js';
import './patronList.html';

Template.patronList.onCreated(() => {
  Meteor.subscribe('patrons');
});

Template.patronList.helpers({
  patrons() {
    return Patrons.find({}, { sort: { createdAt: -1 } });
  },
});

Template.patronList.events({
  'click .add-patron'(event) {
    FlowRouter.go('/app/patrons/new/edit'); // TODO move to constants
  },
});
