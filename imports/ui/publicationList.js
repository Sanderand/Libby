import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Publications } from '../api/publications.js';
import './publicationListItem.js';
import './publicationList.html';

Template.publicationList.onCreated(() => {
  Meteor.subscribe('publications');
});

Template.publicationList.helpers({
  publications() {
    return Publications.find({}, { sort: { createdAt: -1 } });
  },
});

Template.publicationList.events({
  'click .add-publication'(event) {
    FlowRouter.go('/app/publications/new/edit'); // TODO move to constants
  },
});
