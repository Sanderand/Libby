import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Publications } from '../api/publications.js';
import { Books } from '../api/books.js';
import './publication.html';


Template.publication.onCreated(function() {
  Meteor.subscribe('publications');
  
  this.state = new ReactiveDict();
  this.state.set('ISBN', '')
});

Template.publication.events({
  'submit .publication-form'(event) {
    event.preventDefault();

    const target = event.target;
    const publication = {
      _id: target._id.value || null,
      isbn: target.isbn.value,
      barcode: target.barcode.value,
      title: target.title.value,
      subtitle: target.subtitle.value,
      author: target.author.value,
      publisher: target.publisher.value,
      type: target.type.value,
      year: target.year.value,
      rating: '5',//target.rating.value,
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
  },

  'keyup [name=isbn]'(event) {
    Template.instance().state.set('ISBN', event.target.value);
  },

  'click .isbn-look-up'(event, context) {
    const ISBN = context.find('[name=isbn]').value;

    Books.queryISBNInfo(ISBN)
      .then((res) => {
        for (key in res) {
          var node = context.find('[name=' + key + ']');
          if (node && res[key]) {
            node.value = res[key];
          }
        }
      });
  },
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
  },
});
