import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './publicProfile.html';


Template.publicProfile.onCreated(function() {
  const publicId = FlowRouter.getParam('publicId');

  this.state = new ReactiveDict();
  this.state.set('library', null);
  this.state.set('publications', null);

  Meteor.call('public.library', publicId, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      this.state.set('library', res);
    }
  });

  Meteor.call('public.publications', publicId, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      this.state.set('publications', res);
    }
  });
});

Template.publicProfile.helpers({
  library: function() {
    return Template.instance().state.get('library');
  },

  publications: function() {
    return Template.instance().state.get('publications');
  },

  isRented(publication) {
    return (publication.rent && publication.rent.borrowerId);
  },
});
