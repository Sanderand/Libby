import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Publications } from '../api/publications.js';
import { Patrons } from '../api/patrons.js';
import * as constants from '../constants.js';
import './publicationRent.html';
import './spinner.html';


Template.publicationRent.onCreated(function() {
  Meteor.subscribe('publications');
  Meteor.subscribe('patrons');

  this.state = new ReactiveDict();
  this.state.set('searchDone', false);
  this.state.set('searchPending', false);
  this.state.set('selectedPatron', false);
});

Template.publicationRent.events({
  'submit .search-form'(event) {
    event.preventDefault();
    var instance = Template.instance();
    instance.state.set('searchPending', true);

    setTimeout(function() {
      instance.state.set('searchPending', false);
      instance.state.set('searchDone', true);
    }.bind(this), 1000);
  },

  'click .select-patron'(event) {
    Template.instance().state.set('selectedPatron', event.currentTarget.dataset.id);
  },

  'click .rent-publication'() {
    const patronId = Template.instance().state.get('selectedPatron');
    const publicationId = FlowRouter.getParam('publicationId');

    Meteor.call('publication.rent.upsert', publicationId, patronId, (err, data) => {
      if (err) {
        console.error(err); // TODO print error to form
      }

      FlowRouter.go('/app/publications/' + publicationId);
    });
    console.log('TBI');
  },
});

Template.publicationRent.helpers({
  publicationId: function() {
    return FlowRouter.getParam('publicationId');
  },

  activeClass: function(resultPatronId) {
    const selectedPatronId = Template.instance().state.get('selectedPatron');
    return (resultPatronId === selectedPatronId) ? 'active' : '';
  },

  searchPending: function() {
    return Template.instance().state.get('searchPending');
  },

  searchDone: function() {
    return Template.instance().state.get('searchDone');
  },

  selectedPatron: function() {
    return Template.instance().state.get('selectedPatron');
  },

  searchResults: function() {
    return Patrons.find({}, {
      sort: {
        createdAt: -1,
      }
    });
  },
});
