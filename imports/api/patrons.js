import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Patrons = new Mongo.Collection('patrons');


if (Meteor.isServer) {
  Meteor.publish('patrons', function() {
    if(!this.userId) return [];
    const user = Meteor.users.findOne(this.userId);

    return Patrons.find({
      libRef: user.profile.libRef,
    });
  });
}

Meteor.methods({
  'patrons.remove'(patronId) {
    // TODO make sure that user is no longer renting publications
    check(patronId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Patrons.remove(patronId);
  },

  'patrons.upsert'(patron) {
    check(patron.first_name, String);
    check(patron.last_name, String);
    check(patron.email, String);
    check(patron.phone, String);
    check(patron.notes, String);
    check(patron.address.street, String);
    check(patron.address.postal_code, String);
    check(patron.address.city, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Patrons.upsert(patron._id, {
      $set: {
        libRef: Meteor.user().profile.libRef,
        userRef: Meteor.userId(),

        first_name: patron.first_name,
        last_name: patron.last_name,
        email: patron.email,
        phone: patron.phone,
        address: {
          street: patron.address.street,
          postal_code: patron.address.postal_code,
          city: patron.address.city,
        },
        notes: patron.notes,
        updatedAt: new Date(),
      }
    });
  },
});
