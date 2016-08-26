import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Publications } from '../api/publications.js';
import './publicationList.html';

Template.publicationList.onCreated(() => {
  Meteor.subscribe('publications');
});

Template.publicationList.events({
  'click .open-publication'(event) {
    const publicationId = event.currentTarget.dataset.id;
    FlowRouter.go('/app/publications/' + publicationId)
  },
});

Template.publicationList.helpers({
  publications() {
    return Publications.find({}, {
      sort: {
        title: 1,
      }
    });
  },

  isRented(publication) {
    return (publication.rent && publication.rent.patronId);
  },
});
