import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Patrons } from '../api/patrons.js';
import './patron.html';


Template.patronEdit.onCreated(() => {
  this.state = new ReactiveDict();
  Meteor.subscribe('patrons');
});

Template.patronEdit.events({
  'submit .patron-edit-form'(event) {
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

Template.patronEdit.helpers({
  patron: function() {
    const patronId = FlowRouter.getParam('patronId');
    var patron = Patrons.findOne({_id: patronId}) || {};
    return patron;
  },
});

// SHOW

Template.patronShow.onCreated(() => {
  this.state = new ReactiveDict();
  Meteor.subscribe('patrons');
});

Template.patronShow.events({
  'click .remove-patron'(event) {
    const patronId = FlowRouter.getParam('patronId');

    Meteor.call('patrons.remove', patronId, (err, data) => {
      if (err) {
        console.error(err); // TODO print error to form
      } else {
        FlowRouter.go('/app/patrons/');
      }
    });
  },
});

Template.patronShow.helpers({
  patron: function() {
    var patronId = FlowRouter.getParam('patronId');
    var patron = Patrons.findOne({_id: patronId}) || {};
    return patron;
  },
});
