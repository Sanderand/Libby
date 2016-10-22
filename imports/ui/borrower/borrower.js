import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Borrowers } from '../../api/borrowers.js';
import { Publications } from '../../api/publications.js';
import '../publicationActions/publicationActions.js';
import './borrower.html';


Template.borrower.onCreated(function() {
  Meteor.subscribe('borrowers');
  Meteor.subscribe('publications');

  const borrowerId = FlowRouter.getParam('borrowerId');
  this.state = new ReactiveDict();
  this.state.set('mode', (borrowerId === 'new') ? 'FORM' : 'VIEW');
});

Template.borrower.events({
  'click .save-changes'(event, context) {
    var instance = Template.instance();
    const borrowerId = FlowRouter.getParam('borrowerId');
    const borrower = {
      _id: (borrowerId === 'new') ? null : borrowerId,
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

    Meteor.call('borrowers.upsert', borrower, (err, res) => {
      if (err) {
        console.error(err);
      }

      // update path and go to view mode
      const borrowerId = borrower._id || res.insertedId;
      FlowRouter.go('/app/borrowers/' + borrowerId);
      instance.state.set('mode', 'VIEW');
    });
  },

  'click .delete-borrower'() {
    const borrowerId = FlowRouter.getParam('borrowerId');
    Meteor.call('borrowers.remove', borrowerId, (err, res) => {
      if (err) {
        console.error(err);
      }

      FlowRouter.go('/app/borrowers/');
    });
  },

  'click .enter-form-mode'() {
    Template.instance().state.set('mode', 'FORM');
  },

  'click .enter-view-mode'() {
    const borrowerId = FlowRouter.getParam('borrowerId');
    if (borrowerId === 'new') {
        FlowRouter.go('/app/borrowers');
    } else {
      Template.instance().state.set('mode', 'VIEW');
    }
  },
});

Template.borrower.helpers({
  borrower: function() {
    const borrowerId = FlowRouter.getParam('borrowerId');
    var borrower = Borrowers.findOne({_id: borrowerId}) || {};
    return borrower;
  },

  rentedPublications: function() {
    const borrowerId = FlowRouter.getParam('borrowerId');
    var rentedPublications = Publications.find({
      'rent.borrowerId': borrowerId,
    }) || [];
    return rentedPublications;
  },

  eqMode: function(mode) {
    return (Template.instance().state.get('mode') === mode);
  },
});
