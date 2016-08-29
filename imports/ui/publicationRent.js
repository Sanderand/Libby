import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Patrons } from '../api/patrons.js';
import * as constants from '../constants.js';
import './publicationRent.html';


Template.publicationRent.onCreated(function() {
  Meteor.subscribe('patrons');

  this.state = new ReactiveDict();
  this.state.set('selectedPatron', null);
  this.state.set('searchQuery', null);
});

Template.publicationRent.events({
  'submit .search-form'(event) {
    event.preventDefault();
    const searchQuery = event.target.searchQuery.value;

    Template.instance().state.set('selectedPatron', null);
    Template.instance().state.set('searchQuery', searchQuery);
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

  selectedPatron: function() {
    return Template.instance().state.get('selectedPatron');
  },

  searchQuery: function() {
    return Template.instance().state.get('searchQuery');
  },

  activeClass: function(resultPatronId) {
    const selectedPatronId = Template.instance().state.get('selectedPatron');
    return (resultPatronId === selectedPatronId) ? 'active' : '';
  },

  searchResults: function() {
    const searchQuery = Template.instance().state.get('searchQuery');
    const regex = new RegExp(searchQuery, 'i');

    if (searchQuery && searchQuery.length) {
      return Patrons.find({
        $or: [{
          first_name: regex,
        }, {
          last_name: regex,
        }]
      }, {
        sort: {
          last_name: 1,
        },
      });
    }
    
    return [];
  },
});
