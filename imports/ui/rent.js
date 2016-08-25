import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Rents } from '../api/rents.js';
import * as constants from '../constants.js';
import './rent.html';


Template.rent.onCreated(function() {
  Meteor.subscribe('rents');
});

Template.rent.events({
  'submit .rent-form'(event) {
    event.preventDefault();

    const target = event.target;
    const rent = {
      _id: target._id.value || null,
      start_at: target.start_at.value,
      end_at: target.end_at.value,
      publicationRef: target.publicationRef.value,
      userRef: target.userRef.value,
      state: target.state.value,
    };

    Meteor.call('rents.upsert', rent, (err, data) => {
      if (err) {
        console.error(err); // TODO print error to form
      }

      const rentId = rent._id || data.insertedId;
      FlowRouter.go('/app/rents/' + rentId);
    });
  },
});

Template.rent.helpers({
  rent: function() {
    const rentId = FlowRouter.getParam('rentId');
    var rent = Rents.findOne({_id: rentId}) || {
      start_at: new Date(),
      end_at: new Date(Date.now() + constants.rent_duration),
    };
    return rent;
  },

  selectedPubType: function(value, compare) {
    return value == compare ? 'selected' : '';
  },

  publicationRef: function(value) {
    return value || FlowRouter.getQueryParam('publicationId');
  },

  userRef: function(value) {
    return value || FlowRouter.getQueryParam('userId');
  },

  method: function() {
    return (FlowRouter.getParam('rentId') === 'new') ? constants.str_method_create : constants.str_method_update;
  }
});
