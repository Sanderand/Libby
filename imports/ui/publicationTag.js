import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './publicationTag.html';

Template.publicationTag.events({
  'click .tag-remove'(event) {
    const tagName = event.currentTarget.dataset.name;
    const publicationId = FlowRouter.getParam('publicationId');
    Meteor.call('publications.tag.remove', publicationId, tagName);
  },
});
