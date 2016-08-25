import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Publications = new Mongo.Collection('publications');

if (Meteor.isServer) {
  Meteor.publish('publications', () => {
    return Publications.find({});
  });
}

Meteor.methods({
  'publications.remove'(publicationId) {
    check(publicationId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Publications.remove(publicationId);
  },

  'publications.upsert'(publication) {
    check(publication.title, String);
    check(publication.author, String);
    check(publication.publisher, String);
    check(publication.type, String);
    check(publication.year, String);
    check(publication.rating, String);
    check(publication.length, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Publications.upsert(publication._id, {
      $set: {
        title: publication.title,
        author: publication.author,
        publisher: publication.publisher,
        type: publication.type,
        year: publication.year,
        rating: publication.rating,
        length: publication.length,
        updatedAt: new Date(),
      }
    });
  },

  'publications.search'(searchValue) {
    check(searchValue, String);

    // TODO
  },

  'publications.stats.count'() {
    return Publications.find().count();
  },
});
