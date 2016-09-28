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

  Patrons.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });
}

Meteor.methods({
  'patrons.remove'(patronId) {
    check(patronId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    check(patronId, String);

    Patrons.update(patronId, {
      $set: {
        deleted: true,
        deleted_at: new Date(),
      }
    });
  },

  'patrons.upsert'(patron) {
    check(patron, {
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
      }
    });
  },
});
