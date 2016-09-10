import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import * as constants from '../constants.js';
import './patronListItem.html';


Template.patronListItem.events({
  'click .open-patron'(event) {
    const patronId = event.currentTarget.dataset.id;
    FlowRouter.go('/app/patrons/' + patronId)
  },
});
