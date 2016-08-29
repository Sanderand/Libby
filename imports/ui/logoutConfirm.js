import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './logoutConfirm.html';

Template.logoutConfirm.events({
  'click .logout'() {
    Meteor.logout(() => {
      console.log('successfully logged out');
    });
  },
});
