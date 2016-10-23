import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Borrowers } from '../../api/borrowers.js';
import * as constants from '../../constants.js';
import './publicationRent.html';


Template.publicationRent.onCreated(function() {
  Meteor.subscribe('borrowers');

  this.state = new ReactiveDict();
  this.state.set('selectedBorrower', null);
  this.state.set('searchQuery', null);
});

Template.publicationRent.events({
  'submit .search-form'(event) {
    event.preventDefault();
    const searchQuery = event.target.searchQuery.value;

    Template.instance().state.set('selectedBorrower', null);
    Template.instance().state.set('searchQuery', searchQuery);
  },

  'click .select-borrower'(event) {
    Template.instance().state.set('selectedBorrower', event.currentTarget.dataset.id);
  },

  'click .rent-publication'() {
    const request = {
      borrowerId: Template.instance().state.get('selectedBorrower'),
      publicationId: FlowRouter.getParam('publicationId'),
    };

    Meteor.call('publication.rent', request, (err, res) => {
      if (err) {
        console.error(err);
      }

      FlowRouter.go('/app/publications/' + request.publicationId);
    });
  },
});

Template.publicationRent.helpers({
  publicationId: function() {
    return FlowRouter.getParam('publicationId');
  },

  selectedBorrower: function() {
    return Template.instance().state.get('selectedBorrower');
  },

  searchQuery: function() {
    return Template.instance().state.get('searchQuery');
  },

  activeClass: function(resultBorrowerId) {
    const selectedBorrowerId = Template.instance().state.get('selectedBorrower');
    return (resultBorrowerId === selectedBorrowerId) ? 'active' : '';
  },

  searchResults: function() {
    const searchQuery = Template.instance().state.get('searchQuery');
    const regex = new RegExp(searchQuery, 'i');

    if (searchQuery && searchQuery.length) {
      return Borrowers.find({
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
