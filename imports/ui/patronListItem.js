import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './patronListItem.html';

Template.patronListItem.events({
  'click .patron-list-item'(event) {
    const patronId = event.currentTarget.dataset.id;
    FlowRouter.go('/app/patrons/' + patronId)
  },
});
