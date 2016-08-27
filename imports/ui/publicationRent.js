import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import * as constants from '../constants.js';
import './publicationRent.html';
import './spinner.html';


Template.publicationRent.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.set('searchDone', false);
  this.state.set('searchPending', false);
  this.state.set('selectedPatron', false);
});

Template.publicationRent.events({
  'submit .search-form'(event) {
    event.preventDefault();

    const searchQuery = event.target.searchQuery.value;
    var instance = Template.instance();

    instance.state.set('searchPending', true);
    instance.state.set('searchQuery', searchQuery);

    Meteor.call('patrons.search.name', searchQuery, (err, res) => {
      instance.state.set('searchResults', res);
      instance.state.set('searchPending', false);
      instance.state.set('searchDone', true);
    });
  },

  'click .select-patron'(event) {
    Template.instance().state.set('selectedPatron', event.currentTarget.dataset.id);
  },

  'click .rent-publication'() {
    const patronId = Template.instance().state.get('selectedPatron');
    const publicationId = FlowRouter.getParam('publicationId');

    Meteor.call('publication.rent.upsert', publicationId, patronId, (err, res) => {
      if (err) {
        console.error(err); // TODO print error to form
      }

      FlowRouter.go('/app/publications/' + publicationId);
    });
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

  searchQuery: function() {
    return Template.instance().state.get('searchQuery');
  },

  searchResults: function() {
    return Template.instance().state.get('searchResults');
  },
});
