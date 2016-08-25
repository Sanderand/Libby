import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Publications } from '../api/publications.js';
import { Patrons } from '../api/patrons.js';
import './stats.html';


Template.stats.onCreated(function() {
  this.state = new ReactiveDict();

  Meteor.subscribe('publications');
  Meteor.subscribe('patrons');

  Meteor.call('patrons.stats.count', (err, data) => {
    this.state.set('patronsCount', data);
  });

    Meteor.call('publications.stats.count', (err, data) => {
    this.state.set('publicationsCount', data);
  });
});


Template.stats.helpers({
  patronsCount() {
    return Template.instance().state.get('patronsCount');
  },

  publicationsCount() {
    return Template.instance().state.get('publicationsCount');
  },
});
