import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './sidebar.html';

Template.sidebar.events({
  'click .logout-btn'(event) {
    Meteor.logout(() => {
      console.log('successfully logged out');
    });
  },
});
