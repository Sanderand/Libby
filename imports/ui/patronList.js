import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Patrons } from '../api/patrons.js';
import './patronListItem.js';
import './patronList.html';

Template.patronList.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('patrons');
});

// if (instance.state.get('hideCompleted')) {
// instance.state.set('hideCompleted', event.target.checked);

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
