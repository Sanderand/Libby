import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import * as constants from '../constants.js';
import { Borrowers } from '../api/borrowers.js';
import './borrowerListItem.js';
import './borrowerList.html';


Template.borrowerList.onCreated(function() {
  Meteor.subscribe('borrowers');

  this.state = new ReactiveDict();
  this.state.set('searchQuery', '');
});

Template.borrowerList.events({
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
});

Template.borrowerList.helpers({
  borrowers() {
    const searchQuery = Template.instance().state.get('searchQuery');
    var selector = {};
    const options = {
      sort: {
        last_name: 1,
      }
    }

    if (searchQuery && searchQuery.length > constants.minQueryLength) {
      const regex = new RegExp(searchQuery, 'i');

      selector['$or'] = [{
        first_name: regex,
      }, {
        last_name: regex,
      }];
    }

    return Borrowers.find(selector, options);
  },
});
