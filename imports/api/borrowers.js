import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

export const Borrowers = new Mongo.Collection('borrowers');


if (Meteor.isServer) {
  Meteor.publish('borrowers', function() {
    if (!this.userId) return [];
    const user = Meteor.users.findOne(this.userId);

    return Borrowers.find({
      libRef: user.profile.libRef,
      deleted: false,
    }, {
      fields: {
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        notes: true,
        address: true,
      }
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
    check(borrowerId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    check(borrowerId, String);

    Borrowers.update(borrowerId, {
      $set: {
        deleted: true,
        deleted_at: new Date(),
      }
    });
  },

  'borrowers.upsert'(borrower) {
    check(borrower, {
      _id: Match.OneOf(String, null),
      first_name: String,
      last_name: String,
      email: String,
      phone: String,
      notes: String,
      address: {
        street: String,
        postal_code: String,
        city: String,
      },
    });

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
