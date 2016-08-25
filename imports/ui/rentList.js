import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Rents } from '../api/rents.js';
import './rentList.html';


Template.rentList.onCreated(() => {
  Meteor.subscribe('rents');
});

Template.rentList.events({
  'click .rent-list-item'(event) {
    const rentId = event.currentTarget.dataset.id;
    FlowRouter.go('/app/rents/' + rentId)
  },
});

Template.rentList.helpers({
  rents() {
    return Rents.find({}, { sort: { createdAt: -1 } });
  },
});
