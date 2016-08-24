import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './patron.html';

Template.patronEdit.events({
  'click .form-cancel'(event) {
    console.log('form-cancel');
  },
  'click .form-submit'(event) {
    console.log('form-submit');
  },
});
