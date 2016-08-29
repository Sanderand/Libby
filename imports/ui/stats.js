import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Patrons } from '../api/patrons.js';
import { Publications } from '../api/publications.js';
import './stats.html';


Template.stats.onCreated(function() {
  Meteor.subscribe('publications');
  Meteor.subscribe('patrons');

  this.state = new ReactiveDict();
});

Template.stats.helpers({
  patronsCount() {
    return Patrons.find().count();
  },

  publicationsCount() {
    return Publications.find().count();
  },

  publicationsRented() {
    return Publications.find({
      rent: {
        $exists: true,
      }
    }).count();
  },

  publicationsAvailable() {
    return Publications.find({
      rent: {
        $exists: false,
      }
    }).count();
  },
});
