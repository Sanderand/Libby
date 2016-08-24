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
      _id: target._id.value,
      first_name: target.first_name.value,
      last_name: target.last_name.value,
      email: target.email.value,
      phone: target.phone.value,
      street: target.street.value,
      postal_code: target.postal_code.value,
      city: target.city.value,
    };

    Meteor.call('patrons.update', patron, (err, data) => {
      if (err) {
        console.error(err); // TODO print error to form
      } else {
        FlowRouter.go('/app/patrons/' + patron._id);
      }
    });
  },
});

Template.patronEdit.helpers({
  patron: function() {
    var patronId = FlowRouter.getParam('patronId');
    var patron = Patrons.findOne({_id: patronId}) || {};
    return patron;
  },
});

// SHOW

Template.patronShow.onCreated(() => {
  this.state = new ReactiveDict();
  Meteor.subscribe('patrons');
});

Template.patronShow.events({});

Template.patronShow.helpers({
  patron: function() {
    var patronId = FlowRouter.getParam('patronId');
    var patron = Patrons.findOne({_id: patronId}) || {};
    return patron;
  },
});
//
// Template.patronShow.events({
//   'submit .new-patron'(event) {
//     // Prevent default browser form submit
//     event.preventDefault();
//
//     // Get value from form element
//     const target = event.target;
//     const text = target.text.value;
//
//     // Insert a patron into the collection
//     Meteor.call('patrons.insert', text);
//
//     // Clear form
//     target.text.value = '';
//   },
//   'click .delete'() {
//     Meteor.call('patrons.remove', this._id);
//   },
// });
