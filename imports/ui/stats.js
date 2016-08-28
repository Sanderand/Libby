import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './stats.html';


Template.stats.onCreated(function() {
  this.state = new ReactiveDict();

  Meteor.call('patrons.stats.count', (err, data) => {
    this.state.set('patronsCount', data);
  });

  Meteor.call('publications.stats.count', (err, data) => {
    this.state.set('publicationsCount', data);
  });

  Meteor.call('publications.stats.rented', (err, data) => {
    this.state.set('publicationsRented', data);
  });
});


Template.stats.helpers({
  patronsCount() {
    return Template.instance().state.get('patronsCount');
  },

  publicationsCount() {
    return Template.instance().state.get('publicationsCount');
  },

  publicationsRented() {
    return Template.instance().state.get('publicationsRented');
  },

  publicationsAvailable() {
    var instance = Template.instance();
    const total = instance.state.get('publicationsCount');
    const rented = instance.state.get('publicationsRented');
    return (total - rented);
  },
});
