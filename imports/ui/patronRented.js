import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Patrons } from '../api/patrons.js';
import { Publications } from '../api/publications.js';
import './patronRented.html';


Template.patronRented.onCreated(function() {
  Meteor.subscribe('patrons');
  Meteor.subscribe('publications');
});

Template.patronRented.helpers({
  patron: function() {
    const patronId = FlowRouter.getParam('patronId');
    var patron = Patrons.findOne({_id: patronId}) || {};
    return patron;
  },
  rented: function() {
    const patronId = FlowRouter.getParam('patronId');
    var rented = Publications.find({
      'rent.patronId': patronId,
    }) || [];
    return rented;
  }
});

Template.patronRented.events({
  'click .publication-return'(event) {
    const publicationId = event.currentTarget.dataset.id;
    Meteor.call('publication.rent.return', publicationId, (err, data) => {
      if (err) {
        console.error(err);
      }
    });
  }
});
