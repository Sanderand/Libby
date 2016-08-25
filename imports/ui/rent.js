import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Publications } from '../api/publications.js';
import { Patrons } from '../api/patrons.js';
import * as constants from '../constants.js';
import './rent.html';


Template.rent.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.set('patronId', undefined);

  Meteor.subscribe('publications');
  Meteor.subscribe('patrons');
});

Template.rent.events({
  'submit .rent-form'(event) {
    event.preventDefault();

    const publicationId = FlowRouter.getParam('publicationId');
    const patronId = Template.instance().state.get('patronId');

    Meteor.call('publication.rent.upsert', publicationId, patronId, (err, data) => {
      if (err) {
        console.error(err); // TODO print error to form
      }

      FlowRouter.go('/app/publications/' + publicationId);
    });
  },

  'click .patron-select'(event, instance) {
    const patronId = event.currentTarget.dataset.id;
    Template.instance().state.set('patronId', patronId);
  }
});

Template.rent.helpers({
  patrons() {
    return Patrons.find({}, { sort: { createdAt: -1 } });
  },

  publication: function() {
    const publicationId = FlowRouter.getParam('publicationId');
    var publication = Publications.findOne({_id: publicationId}) || {};
    return publication;
  },

  selectedPubType: function(value, compare) {
    return value == compare ? 'selected' : '';
  },
});
