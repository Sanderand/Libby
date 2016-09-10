import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import * as constants from '../constants.js';
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

  'change .non-admins-add'(event) {
    const nonAdminsCanAddUsers = event.target.checked || false;

    Meteor.call('libraries.setNonAdminAddUsers', nonAdminsCanAddUsers, (err, res) => {
      if (err) {
        console.error(err);
        event.target.checked = !nonAdminsCanAddUsers;
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

  'change .max-extends'(event, context) {
    const maxExtends = parseInt(context.find('[name=maxExtends]').value);

    Meteor.call('libraries.setMaxExtends', maxExtends, (err, res) => {
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

  isAdmin(user) {
    return (Meteor.user() && Meteor.user().profile.role === constants.roles.admin);
  }
});
