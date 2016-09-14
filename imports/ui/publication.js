import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Publications } from '../api/publications.js';
import { Books } from '../api/books.js';
import './publicationActions.js';
import './publication.html';


Template.publication.onCreated(function() {
  Meteor.subscribe('publications');

  const publicationId = FlowRouter.getParam('publicationId');

  this.state = new ReactiveDict();
  this.state.set('ISBN', '')
  this.state.set('mode', (publicationId === 'new') ? 'FORM' : 'VIEW');
});

Template.publication.events({
  'click .save-changes'(event, context) {
    var instance = Template.instance();
    const publicationId = FlowRouter.getParam('publicationId');
    const publication = {
      _id: (publicationId === 'new') ? null : publicationId,
      isbn: context.find('[name=isbn]').value,
      barcode: context.find('[name=barcode]').value,
      title: context.find('[name=title]').value,
      subtitle: context.find('[name=subtitle]').value,
      description: context.find('[name=description]').value,
      author: context.find('[name=author]').value,
      publisher: context.find('[name=publisher]').value,
      type: context.find('[name=type]').value,
      year: context.find('[name=year]').value,
      length: context.find('[name=length]').value,
    };

    Meteor.call('publications.upsert', publication, (err, res) => {
      if (err) {
        console.error(err);
      }

      // update path and go to view mode
      const publicationId = publication._id || res.insertedId;
      FlowRouter.go('/app/publications/' + publicationId);
      instance.state.set('mode', 'VIEW');
    });
  },

  'click .delete-publication'() {
    const publicationId = FlowRouter.getParam('publicationId');
    Meteor.call('publications.remove', publicationId, (err, res) => {
      if (err) {
        console.error(err);
      }

      FlowRouter.go('/app/publications/');
    });
  },

  'submit .tag-form'(event) {
    event.preventDefault();

    const target = event.target;
    const tagName = target.tagName.value;
    const publicationId = FlowRouter.getParam('publicationId');

    Meteor.call('publications.tag.add', publicationId, tagName, (err, res) => {
      if (err) {
        console.error(err);
      }
    });

    target.tagName.value = '';
  },

  'click .tag-remove'(event) {
    const tagName = event.currentTarget.dataset.name;
    const publicationId = FlowRouter.getParam('publicationId');
    Meteor.call('publications.tag.remove', publicationId, tagName);
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

  'click .enter-form-mode'() {
    Template.instance().state.set('mode', 'FORM');
  },

  'click .enter-view-mode'() {
    const publicationId = FlowRouter.getParam('publicationId');
    if (publicationId === 'new') {
        FlowRouter.go('/app/publications');
    } else {
      Template.instance().state.set('mode', 'VIEW');
    }
  },

  'click .set-rating'(event) {
    const publicationId = FlowRouter.getParam('publicationId');
    const rating = parseInt(event.currentTarget.dataset.rating);

    Meteor.call('publications.rate', publicationId, rating, (err, res) => {
      if (err) {
        console.error(err);
      }
    });
  },
});

Template.publication.helpers({
  publication: function() {
    const publicationId = FlowRouter.getParam('publicationId');
    var instance = Template.instance();

    var publication = Publications.findOne({
      _id: publicationId
    }) || {};

    instance.state.set('rating', publication.rating);

    return publication;
  },

  eqMode: function(mode) {
    return (Template.instance().state.get('mode') === mode);
  },

  getRatingClass: function(rating) {
    const currentRating = parseInt(Template.instance().state.get('rating'));
    return (parseInt(rating) <= currentRating) ? 'active' : 'inactive';
  },
});
