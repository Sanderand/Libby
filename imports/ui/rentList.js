import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Publications } from '../api/publications.js';
import './rentList.html';


Template.rentList.onCreated(function() {
  Meteor.subscribe('publications');
});

Template.rentList.events({
  'click .open-publication'(event) {
    const publicationId = event.currentTarget.dataset.id;
    FlowRouter.go('/app/publications/' + publicationId)
  },

  'click .publication-return'(event) {
    event.preventDefault();
    event.stopPropagation();

    const publicationId = event.currentTarget.dataset.id;
    Meteor.call('publication.rent.return', publicationId, (err, data) => {
      if (err) {
        console.error(err);
      }
    });
  },

  'click .publication-extend'(event) {
    event.preventDefault();
    event.stopPropagation();

    const publicationId = event.currentTarget.dataset.id;
    Meteor.call('publication.rent.extend', publicationId, (err, data) => {
      if (err) {
        console.error(err);
      }
    });
  },
});

Template.rentList.helpers({
  rentedPublications: function() {
    return Publications.find({
      rent: {
        $exists: true,
      }
    });
  },
});
