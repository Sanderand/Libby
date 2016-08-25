import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Patrons } from '../api/patrons.js';
import './patron.html';


Template.patron.onCreated(function() {
  Meteor.subscribe('patrons');
});

Template.patron.events({
  'submit .patron-form'(event) {
    event.preventDefault();

    const target = event.target;
    const patron = {
      _id: target._id.value || null,
      first_name: target.first_name.value,
      last_name: target.last_name.value,
      email: target.email.value,
      phone: target.phone.value,
      street: target.street.value,
      postal_code: target.postal_code.value,
      city: target.city.value,
      notes: target.notes.value,
    };

    Meteor.call('patrons.upsert', patron, (err, data) => {
      if (err) {
        console.error(err); // TODO print error to form
      }

      const patronId = patron._id || data.insertedId;
      FlowRouter.go('/app/patrons/' + patronId);
    });
  },
});

Template.patron.helpers({
  patron: function() {
    const patronId = FlowRouter.getParam('patronId');
    var patron = Patrons.findOne({_id: patronId}) || {};
    return patron;
  },
});
