import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Libraries } from '../api/libraries.js';
import * as constants from '../constants.js';
import './publicationActions.html';


Template.publicationActions.onCreated(function() {
  if (!localStorage.getItem('maxExtends')) { // TODO use Session here
    Meteor.call('libraries.maxExtends', (err, res) => {
      if (err) {
        console.error(err);
      } else {
        localStorage.setItem('maxExtends', res.maxExtends); // TODO use Session here
      }
    });
  }
});

Template.publicationActions.events({
  'click .extend-publication'(event, context) {
    Meteor.call('publication.extend', context.data._id, (err, res) => {
      if (err) {
        console.error(err);
      }
    });
  },

  'click .return-publication'(event, context) {
    Meteor.call('publication.return', context.data._id, (err, res) => {
      if (err) {
        console.error(err);
      }
    });
  },
});

Template.publicationActions.helpers({
  canExtend() {
    const maxExtends = localStorage.getItem('maxExtends') || 0; // TODO use Session here
    if (this.rent && maxExtends) {
      return (this.rent.extended < maxExtends);
    }
  },
});
