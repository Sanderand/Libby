import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import * as constants from '../constants.js';
export const Publications = new Mongo.Collection('publications');


if (Meteor.isServer) {
  Meteor.publish('publications', function() {
    if(!this.userId) return [];
    const user = Meteor.users.findOne(this.userId);

    return Publications.find({
      libRef: user.profile.libRef,
    }, {
      fields: {
        title: true,
        author: true,
        publisher: true,
        type: true,
        year: true,
        length: true,
        isbn: true,
        barcode: true,
        subtitle: true,
        description: true,
        rating: true,
        tags: true,
        rent: true,
      }
    });
  });

  Publications.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
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
    check(publication.length, String);
    check(publication.isbn, String);
    check(publication.barcode, String);
    check(publication.subtitle, String);
    check(publication.description, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Publications.upsert(publication._id, {
      $set: {
        libRef: Meteor.user().profile.libRef,
        userRef: Meteor.userId(),

        title: publication.title,
        author: publication.author,
        publisher: publication.publisher,
        type: publication.type,
        year: publication.year,
        length: publication.length,
        isbn: publication.isbn,
        barcode: publication.barcode,
        subtitle: publication.subtitle,
        description: publication.description,
      }
    });
  },

  'publications.rate'(publicationId, rating) {
    check(publicationId, String);
    check(rating, Number);

    return Publications.update(publicationId, {
      $set: {
        rating: rating
      }
    });
  },

  'publications.tag.add'(publicationId, tagName) {
    check(publicationId, String);
    check(tagName, String);

    return Publications.update(publicationId, {
      $addToSet: {
        tags: tagName
      }
    });
  },

  'publications.tag.remove'(publicationId, tagName) {
    check(publicationId, String);
    check(tagName, String);

    return Publications.update(publicationId, {
      $pull: {
        tags: tagName
      }
    });
  },

  'publication.rent.upsert'(publicationId, patronId) {
    check(publicationId, String);
    check(patronId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Publications.upsert(publicationId, {
      $set: {
        'rent.start_at': new Date(),
        'rent.end_at': new Date(Date.now() + constants.rent_duration),
        'rent.patronId': patronId,
      }
    });
  },

  'publication.rent.extend'(publicationId) {
    // TODO
    console.log('IMPLEMENT: EXTEND PUBLCIATION');
  },

  'publication.rent.return'(publicationId) {
    check(publicationId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Publications.update(publicationId, {
      $unset: {
        rent: '',
      }
    });
  },
});
