import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { ReactiveDict } from 'meteor/reactive-dict';

import { Publications } from '../api/publications.js';
import './publication.html';


Template.publication.onCreated(function() {
  // this.state = new ReactiveDict();
  // this.state.set('tags', []);
  Meteor.subscribe('publications');
});

Template.publication.events({
  'submit .publication-form'(event) {
    event.preventDefault();

    const target = event.target;
    const publication = {
      _id: target._id.value || null,
      title: target.title.value,
      author: target.author.value,
      publisher: target.publisher.value,
      type: target.type.value,
      year: target.year.value,
      rating: target.rating.value,
      length: target.length.value,
    };

    Meteor.call('publications.upsert', publication, (err, data) => {
      if (err) {
        console.error(err); // TODO print error to form
      }

      const publicationId = publication._id || data.insertedId;
      FlowRouter.go('/app/publications/' + publicationId);
    });
  },

  'click .publication-return'() {
    const publicationId = FlowRouter.getParam('publicationId');
    Meteor.call('publication.rent.return', publicationId, (err, data) => {
      if (err) {
        console.error(err);
      }
    });
  },

  'submit .tag-form'(event) {
    event.preventDefault();

    const target = event.target;
    const tagName = target.tagName.value;
    const publicationId = FlowRouter.getParam('publicationId');

    Meteor.call('publications.tag.add', publicationId, tagName, (err, data) => {
      if (err) {
        console.error(err);
      }
    });

    target.tagName.value = '';
  }
});

Template.publication.helpers({
  publication: function() {
    const publicationId = FlowRouter.getParam('publicationId');
    var publication = Publications.findOne({_id: publicationId}) || {};
    return publication;
  },

  selectedPubType: function(value, compare) {
    return value == compare ? 'selected' : '';
  },

  serialize: function(val) {
    return JSON.stringify(val);
  }

  // tags: function() {
  //   return Template.instance().state.get('tags');
  // }
});
