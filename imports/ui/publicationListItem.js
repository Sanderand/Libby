import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './publicationListItem.html';

Template.publicationListItem.events({
  'click .publication-list-item'(event) {
    const publicationId = event.currentTarget.dataset.id;
    FlowRouter.go('/app/publications/' + publicationId)
  },
});
