import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Libraries } from '../api/libraries.js';
import './settings.html';


Template.settings.onCreated(function() {
  Meteor.subscribe('libraries');

  this.state = new ReactiveDict();
});

Template.settings.events({
  'change .public-page'(event) {
    const hasPublicPage = event.target.checked || false;

    Meteor.call('libraries.setPublicPage', hasPublicPage, (err, res) => {
      if (err) {
        console.error(err);
        event.target.checked = !hasPublicPage;
      }
    });
  },

  'change .rent-days'(event, context) {
    const rentDays = parseInt(context.find('[name=rentDays]').value);

    Meteor.call('libraries.setRentDays', rentDays, (err, res) => {
      if (err) {
        console.error(err);
      }
    });
  },

  'change .extend-days'(event, context) {
    const extendDays = parseInt(context.find('[name=extendDays]').value);

    Meteor.call('libraries.setExtendDays', extendDays, (err, res) => {
      if (err) {
        console.error(err);
      }
    });
  },
});

Template.settings.helpers({
  library() {
    if (Meteor.user()) {
      return Libraries.findOne({
        _id: Meteor.user().profile.libRef,
      });
    }

    return {};
  },
});
