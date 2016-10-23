import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

import { borrowerResponse, borrowersRemoveRequest, borrowersUpsertRequest } from './models/borrowers.js';
export const Borrowers = new Mongo.Collection('borrowers');


if (Meteor.isServer) {
  Meteor.publish('borrowers', function() {
    if (!this.userId) return [];
    const user = Meteor.users.findOne(this.userId);

    return Borrowers.find({
      libRef: user.profile.libRef,
      deleted: false,
    }, {
      fields: borrowerResponse,
    });
  });

  Borrowers.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });
}

Meteor.methods({
  'borrowers.remove'(borrowerId) {
    check(borrowerId, borrowersRemoveRequest);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Borrowers.update(borrowerId, {
      $set: {
        deleted: true,
        deleted_at: new Date(),
      }
    });
  },

  'borrowers.upsert'(borrower) {
    check(borrower, borrowersUpsertRequest);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Borrowers.upsert(borrower._id, {
      $set: {
        libRef: Meteor.user().profile.libRef,
        userRef: Meteor.userId(),

        deleted: false,

        first_name: borrower.first_name,
        last_name: borrower.last_name,
        email: borrower.email,
        phone: borrower.phone,
        address: {
          street: borrower.address.street,
          postal_code: borrower.address.postal_code,
          city: borrower.address.city,
        },
        notes: borrower.notes,
      }
    });
  },
});
