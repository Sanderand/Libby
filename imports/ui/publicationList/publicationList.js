import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import * as constants from '../../constants.js';
import { Publications } from '../../api/publications.js';
import '../publicationListItem/publicationListItem.js';
import './publicationList.html';


Template.publicationList.onCreated(function() {
  Meteor.subscribe('publications');

  this.state = new ReactiveDict();
  this.state.set('searchQuery', '');
  this.state.set('filter', constants.filters.all);
});

Template.publicationList.events({
  'submit .search'(event) {
    event.preventDefault();
    const searchQuery = event.target.searchValue.value;
    Template.instance().state.set('searchQuery', searchQuery);
  },

  'keyup .search input'(event) {
    if (event.currentTarget.value.length === 0) {
      Template.instance().state.set('searchQuery', '');
    }
  },

  'click .show-all'(event) {
    Template.instance().state.set('filter', constants.filters.all);
  },

  'click .show-available'(event) {
    Template.instance().state.set('filter', constants.filters.available);
  },

  'click .show-rented'(event) {
    Template.instance().state.set('filter', constants.filters.rented);
  },
});

Template.publicationList.helpers({
  publications() {
    const searchQuery = Template.instance().state.get('searchQuery');
    const filter = Template.instance().state.get('filter');
    var selector = {};
    const options = {
      sort: {
        title: 1,
      }
    }

    if (filter === constants.filters.available) {
      selector['rent'] = {
        $exists: false,
      };
    } else if (filter === constants.filters.rented) {
      selector['rent'] = {
        $exists: true,
      };
    }

    if (searchQuery && searchQuery.length > constants.minQueryLength) {
      const regex = new RegExp(searchQuery, 'i');

      selector['$or'] = [{
        title: regex,
      }, {
        author: regex,
      }];
    }

    return Publications.find(selector, options);
  },

  isRented(publication) {
    return (publication.rent && publication.rent.borrowerId);
  },
});
