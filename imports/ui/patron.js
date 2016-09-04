import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Patrons } from '../api/patrons.js';
import { Publications } from '../api/publications.js';
import './patron.html';


Template.patron.onCreated(function() {
  Meteor.subscribe('patrons');
  Meteor.subscribe('publications');

  const patronId = FlowRouter.getParam('patronId');
  this.state = new ReactiveDict();
  this.state.set('mode', (patronId === 'new') ? 'FORM' : 'VIEW');
});

Template.patron.events({
  'click .save-changes'(event, context) {
    var instance = Template.instance();
    const patronId = FlowRouter.getParam('patronId');
    const patron = {
      _id: (patronId === 'new') ? null : patronId,
      first_name: context.find('[name=first_name]').value,
      last_name: context.find('[name=last_name]').value,
      email: context.find('[name=email]').value,
      phone: context.find('[name=phone]').value,
      notes: context.find('[name=notes]').value,
      address: {
        street: context.find('[name=street]').value,
        postal_code: context.find('[name=postal_code]').value,
        city: context.find('[name=city]').value,
      },
    };

    Meteor.call('patrons.upsert', patron, (err, data) => {
      if (err) {
        console.error(err);
      }

      // update path and go to view mode
      const patronId = patron._id || data.insertedId;
      FlowRouter.go('/app/patrons/' + patronId);
      instance.state.set('mode', 'VIEW');
    });
  },

  'click .delete-patron'() {
    const patronId = FlowRouter.getParam('patronId');
    Meteor.call('patrons.remove', patronId, (err, data) => {
      if (err) {
        console.error(err);
      }

      FlowRouter.go('/app/patrons/');
    });
  },

  'click .publication-return'(event) {
    const publicationId = event.currentTarget.dataset.id;
    Meteor.call('publication.return', publicationId, (err, data) => {
      if (err) {
        console.error(err);
      }
    });
  },

  'click .publication-extend'(event) {
    const publicationId = event.currentTarget.dataset.id;
    Meteor.call('publication.extend', publicationId, (err, data) => {
      if (err) {
        console.error(err);
      }
    });
  },

  'click .enter-form-mode'() {
    Template.instance().state.set('mode', 'FORM');
  },

  'click .enter-view-mode'() {
    const patronId = FlowRouter.getParam('patronId');
    if (patronId === 'new') {
        FlowRouter.go('/app/patrons');
    } else {
      Template.instance().state.set('mode', 'VIEW');
    }
  },
});

Template.patron.helpers({
  patron: function() {
    const patronId = FlowRouter.getParam('patronId');
    var patron = Patrons.findOne({_id: patronId}) || {};
    return patron;
  },

  rentedPublications: function() {
    const patronId = FlowRouter.getParam('patronId');
    var rentedPublications = Publications.find({
      'rent.patronId': patronId,
    }) || [];
    return rentedPublications;
  },

  eqMode: function(mode) {
    return (Template.instance().state.get('mode') === mode);
  },
});
