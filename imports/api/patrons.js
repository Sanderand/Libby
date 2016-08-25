import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Patrons = new Mongo.Collection('patrons');

if (Meteor.isServer) {
  Meteor.publish('patrons', () => {
    return Patrons.find({});
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
    check(patron.street, String);
    check(patron.postal_code, String);
    check(patron.city, String);
    check(patron.notes, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Patrons.upsert(patron._id, {
      $set: {
        first_name: patron.first_name,
        last_name: patron.last_name,
        email: patron.email,
        phone: patron.phone,
        street: patron.street,
        postal_code: patron.postal_code,
        city: patron.city,
        notes: patron.notes,
        updatedAt: new Date(),
      }
    });
  },

  'patrons.search'(searchValue) {
    check(searchValue, String);

    // TODO
  },

  'patrons.stats.count'() {
    return Patrons.find().count();
  },
});
