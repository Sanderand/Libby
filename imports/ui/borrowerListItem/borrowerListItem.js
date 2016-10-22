import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import * as constants from '../../constants.js';
import './borrowerListItem.html';


Template.borrowerListItem.events({
  'click .open-borrower'(event) {
    const borrowerId = event.currentTarget.dataset.id;
    FlowRouter.go('/app/borrowers/' + borrowerId)
  },
});
