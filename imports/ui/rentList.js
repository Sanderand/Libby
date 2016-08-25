import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Publications } from '../api/publications.js';
import './rentList.html';


Template.rentList.onCreated(() => {
  Meteor.subscribe('publications');
});

Template.rentList.events({
  'click .rent-list-item'(event) {
    const rentId = event.currentTarget.dataset.id;
    FlowRouter.go('/app/rents/' + rentId)
  },
});

Template.rentList.helpers({
  rents() {
    // return Publications.find({
    //   '_id': { '$exists': 1 }
    // }, (err, data) => {
    //   console.log(err, data);
    // });
  },
});
