import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Libraries = new Mongo.Collection('libraries');


if (Meteor.isServer) {
  Meteor.publish('libraries', function() {
    if(!this.userId) return [];
    const user = Meteor.users.findOne(this.userId);

    return Libraries.find({
      _id: user.profile.libRef,
    }, {
      fields: {
        _id: true,
        name: true,
        notes: true,
        organization: true,
        phone: true,
        email: true,
        address: true,
      }
    });
  });

  Libraries.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });
}

Meteor.methods({
  'libraries.upsert'(library) {
    const libRef = Meteor.user().profile.libRef;

    check(library.name, String);
    check(library.notes, String);
    check(library.organization, String);
    check(library.phone, String);
    check(library.email, String);
    check(library.address.street, String);
    check(library.address.postal_code, String);
    check(library.address.city, String);

    if (!libRef) {
      throw new Meteor.Error('not-authorized');
    }

    return Libraries.upsert(libRef, {
      $set: {
        name: library.name,
        notes: library.notes,
        organization: library.organization,
        phone: library.phone,
        email: library.email,
        address: {
          street: library.address.street,
          postal_code: library.address.postal_code,
          city: library.address.city,
        },
      }
    });
  },
});
