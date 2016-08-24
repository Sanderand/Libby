import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Patrons = new Mongo.Collection('patrons');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish patrons that are public or belong to the current user
  Meteor.publish('patrons', function patronsPublication() {
    return Patrons.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'patrons.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a patron
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Patrons.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'patrons.remove'(patronId) {
    check(patronId, String);

    const patron = Patrons.findOne(patronId);
    if (patron.private && patron.owner !== this.userId) {
      // If the patron is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Patrons.remove(patronId);
  },
  'patrons.update'(patron) {
    check(patron._id, String);
    check(patron.first_name, String);
    check(patron.last_name, String);
    check(patron.email, String);
    check(patron.phone, String);
    check(patron.street, String);
    check(patron.postal_code, String);
    check(patron.city, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Patrons.update(patron._id, {
      $set: {
        first_name: patron.first_name,
        last_name: patron.last_name,
        email: patron.email,
        phone: patron.phone,
        street: patron.street,
        postal_code: patron.postal_code,
        city: patron.city,
        updatedAt: new Date(),
      }
    });
  }
  // 'patrons.setChecked'(patronId, setChecked) {
  //   check(patronId, String);
  //   check(setChecked, Boolean);
  //
  //   const patron = Patrons.findOne(patronId);
  //   if (patron.private && patron.owner !== this.userId) {
  //     // If the patron is private, make sure only the owner can check it off
  //     throw new Meteor.Error('not-authorized');
  //   }
  //
  //   Patrons.update(patronId, { $set: { checked: setChecked } });
  // },
  // 'patrons.setPrivate'(patronId, setToPrivate) {
  //   check(patronId, String);
  //   check(setToPrivate, Boolean);
  //
  //   const patron = Patrons.findOne(patronId);
  //
  //   // Make sure only the patron owner can make a patron private
  //   if (patron.owner !== this.userId) {
  //     throw new Meteor.Error('not-authorized');
  //   }
  //
  //   Patrons.update(patronId, { $set: { private: setToPrivate } });
  // },
});
