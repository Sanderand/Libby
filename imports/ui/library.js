import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Libraries } from '../api/libraries.js';
import './library.html';


Template.library.onCreated(function() {
  Meteor.subscribe('libraries');
  Meteor.subscribe('libraryUsers');

  this.state = new ReactiveDict();
  this.state.set('mode', 'VIEW');
});

Template.library.events({
  'click .save-changes'(event, context) {
    var instance = Template.instance();
    const library = {
      name: context.find('[name=name]').value,
      organization: context.find('[name=organization]').value,
      notes: context.find('[name=notes]').value,
      phone: context.find('[name=phone]').value,
      email: context.find('[name=email]').value,
      address: {
        street: context.find('[name=street]').value,
        postal_code: context.find('[name=postal_code]').value,
        city: context.find('[name=city]').value,
      },
    };

    Meteor.call('libraries.upsert', library, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        instance.state.set('mode', 'VIEW');
      }
    });
  },

  'click .enter-form-mode'() {
    Template.instance().state.set('mode', 'FORM');
  },

  'click .enter-view-mode'() {
    Template.instance().state.set('mode', 'VIEW');
  },

  'click .library-user'(event) {
    const userId = event.currentTarget.dataset.id;
    FlowRouter.go('/app/library/users/' + userId);
  },
});

Template.library.helpers({
  eqMode: function(mode) {
    return (Template.instance().state.get('mode') === mode);
  },

  library() {
    if (Meteor.user()) {
      return Libraries.findOne({
        _id: Meteor.user().profile.libRef,
      });
    }

    return {};
  },

  libraryUsers: function() {
    if (Meteor.user()) {
      return Meteor.users.find({}, {
        sort: {
          'profile.role': 1,
        }
      }).fetch();
    }

    return [];
  }
});
