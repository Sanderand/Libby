import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Rents = new Mongo.Collection('rents');

if (Meteor.isServer) {
  Meteor.publish('rents', () => {
    return Rents.find({});
  });
}

Meteor.methods({
  'rents.remove'(rentId) {
    check(rentId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Rents.remove(rentId);
  },

  'rents.upsert'(rent) {
    check(rent.start_at, String);
    check(rent.end_at, String);
    check(rent.publicationRef, String);
    check(rent.userRef, String);
    check(rent.state, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Rents.upsert(rent._id, {
      $set: {
        start_at: rent.start_at,
        end_at: rent.end_at,
        updated_at: new Date(),
        publicationRef: rent.publicationRef,
        userRef: rent.userRef,
        state: rent.state,
      }
    });
  },
});
