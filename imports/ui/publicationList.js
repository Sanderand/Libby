import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Publications } from '../api/publications.js';
import './publicationList.html';


Template.publicationList.onCreated(function() {
  Meteor.subscribe('publications');

  this.state = new ReactiveDict();
  this.state.set('searchQuery', '');
});

Template.publicationList.events({
  'click .open-publication'(event) {
    const publicationId = event.currentTarget.dataset.id;
    FlowRouter.go('/app/publications/' + publicationId)
  },

  'submit .search-bar'(event) {
    event.preventDefault();
    const searchQuery = event.target.searchValue.value;
    Template.instance().state.set('searchQuery', searchQuery);
  },
});

Template.publicationList.helpers({
  publications() {
    const searchQuery = Template.instance().state.get('searchQuery');
    var selector = {};
    const options = {
      sort: {
        title: 1,
      }
    }

    if (searchQuery && searchQuery.length > 1) { // TODO use constant
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
    return (publication.rent && publication.rent.patronId);
  },
});
