import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Patrons } from '../api/patrons.js';
import './patronList.html';


Template.patronList.onCreated(function() {
  Meteor.subscribe('patrons');

  this.state = new ReactiveDict();
  this.state.set('searchQuery', '');
});

Template.patronList.events({
  'click .open-patron'(event) {
    const patronId = event.currentTarget.dataset.id;
    FlowRouter.go('/app/patrons/' + patronId)
  },

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

Template.patronList.helpers({
  patrons() {
    const searchQuery = Template.instance().state.get('searchQuery');
    var selector = {};
    const options = {
      sort: {
        last_name: 1,
      }
    }

    if (searchQuery && searchQuery.length > 1) { // TODO use constant
      const regex = new RegExp(searchQuery, 'i');

      selector['$or'] = [{
        first_name: regex,
      }, {
        last_name: regex,
      }];
    }

    return Patrons.find(selector, options);
  },
});
