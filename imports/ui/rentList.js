import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Publications } from '../api/publications.js';
import './rentList.html';


Template.rentList.onCreated(function() {
  Meteor.subscribe('publications');

  this.state = new ReactiveDict();
  this.state.set('searchQuery', '');
});

Template.rentList.events({
  'click .open-publication'(event) {
    const publicationId = event.currentTarget.dataset.id;
    FlowRouter.go('/app/publications/' + publicationId)
  },

  'click .publication-return'(event) {
    event.preventDefault();
    event.stopPropagation();

    const publicationId = event.currentTarget.dataset.id;
    Meteor.call('publication.return', publicationId, (err, data) => {
      if (err) {
        console.error(err);
      }
    });
  },

  'click .publication-extend'(event) {
    event.preventDefault();
    event.stopPropagation();

    const publicationId = event.currentTarget.dataset.id;
    Meteor.call('publication.extend', publicationId, (err, data) => {
      if (err) {
        console.error(err);
      }
    });
  },

  'submit .search-bar'(event) {
    event.preventDefault();
    const searchQuery = event.target.searchValue.value;
    Template.instance().state.set('searchQuery', searchQuery);
  },
});

Template.rentList.helpers({
  rentedPublications: function() {
    const searchQuery = Template.instance().state.get('searchQuery');
    var selector = {
      rent: {
        $exists: true,
      }
    };
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
});
