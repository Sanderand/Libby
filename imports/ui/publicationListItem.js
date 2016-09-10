import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import * as constants from '../constants.js';
import { Publications } from '../api/publications.js';
import './publicationListItem.html';


Template.publicationListItem.events({
  'click .open-publication'(event) {
    const publicationId = event.currentTarget.dataset.id;
    FlowRouter.go('/app/publications/' + publicationId)
  },
});

Template.publicationListItem.helpers({
  isRented(publication) {
    return (publication.rent && publication.rent.patronId);
  },
});
