import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Publications } from '../api/publications.js';
import './publication.html';


Template.publication.onCreated(function() {
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
});

Template.publication.helpers({
  publication: function() {
    const publicationId = FlowRouter.getParam('publicationId');
    var publication = Publications.findOne({_id: publicationId}) || {};
    return publication;
  },
});
