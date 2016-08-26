import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Publications } from '../api/publications.js';
import { Books } from '../api/books.js';
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
      rating: '5', // context.find('[name=rating]').value,
      length: context.find('[name=length]').value,
    };

    Meteor.call('publications.upsert', publication, (err, data) => {
      if (err) {
        console.error(err); // TODO print error to form
      }

      // update path and go to view mode
      const publicationId = publication._id || data.insertedId;
      FlowRouter.go('/app/publications/' + publicationId);
      instance.state.set('mode', 'VIEW');
    });
  },

  'click .delete-publication'() {
    const publicationId = FlowRouter.getParam('publicationId');
    Meteor.call('publications.remove', publicationId, (err, data) => {
      if (err) {
        console.error(err);
      }

      FlowRouter.go('/app/publications/');
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

  eqMode: function(mode) {
    return (Template.instance().state.get('mode') === mode);
  },
});
