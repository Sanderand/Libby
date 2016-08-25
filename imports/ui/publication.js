import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Publications } from '../api/publications.js';
import './publication.html';


Template.publicationEdit.onCreated(() => {
  this.state = new ReactiveDict();
  Meteor.subscribe('publications');
});

Template.publicationEdit.events({
  'submit .publication-edit-form'(event) {
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
});

Template.publicationEdit.helpers({
  publication: function() {
    const publicationId = FlowRouter.getParam('publicationId');
    var publication = Publications.findOne({_id: publicationId}) || {};
    return publication;
  },
});

// SHOW

Template.publicationShow.onCreated(() => {
  this.state = new ReactiveDict();
  Meteor.subscribe('publications');
});

Template.publicationShow.events({
  'click .remove-publication'(event) {
    const publicationId = FlowRouter.getParam('publicationId');

    Meteor.call('publications.remove', publicationId, (err, data) => {
      if (err) {
        console.error(err); // TODO print error to form
      } else {
        FlowRouter.go('/app/publications/');
      }
    });
  },
});

Template.publicationShow.helpers({
  publication: function() {
    var publicationId = FlowRouter.getParam('publicationId');
    var publication = Publications.findOne({_id: publicationId}) || {};
    return publication;
  },
});
