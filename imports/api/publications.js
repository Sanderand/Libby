import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

import * as constants from '../constants.js';
import { Libraries } from './libraries.js';
export const Publications = new Mongo.Collection('publications');


if (Meteor.isServer) {
  Meteor.publish('publications', function() {
    if(!this.userId) return [];
    const user = Meteor.users.findOne(this.userId);

    return Publications.find({
      libRef: user.profile.libRef,
      deleted: false,
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

    check(publicationId, String);

    Publications.update(publicationId, {
      $set: {
        deleted: true,
        deleted_at: new Date(),
      }
    });
  },

  'publications.upsert'(publication) {
    check(publication, {
      _id: Match.OneOf(String, null),
      title: String,
      author: String,
      publisher: String,
      type: String,
      year: String,
      length: String,
      isbn: String,
      barcode: String,
      subtitle: String,
      description: String,
    });

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Publications.upsert(publication._id, {
      $set: {
        libRef: Meteor.user().profile.libRef,
        userRef: Meteor.userId(),

        deleted: false,

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

  'publication.rent'(publicationId, borrowerId) {
    check(publicationId, String);
    check(borrowerId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const library = Libraries.findOne({
      _id: Meteor.user().profile.libRef,
    });

    if (library) {
      const rentDays = library.rentDays;

      return Publications.update(publicationId, {
        $set: {
          'rent.start_at': new Date(),
          'rent.end_at': new Date(Date.now() + rentDays * 24 * 60 * 60 * 1000),
          'rent.borrowerId': borrowerId,
          'rent.extended': 0,
        }
      });
    }
  },

  'publication.extend'(publicationId) {
    check(publicationId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const publication = Publications.findOne({
      _id: publicationId,
    });

    const library = Libraries.findOne({
      _id: Meteor.user().profile.libRef,
    });

    if (publication && library && publication.rent.extended < library.maxExtends) {
      const rentEndTimestamp = new Date(publication.rent.end_at).getTime();

      return Publications.update(publicationId, {
        $set: {
          'rent.end_at': new Date(rentEndTimestamp + library.extendDays * 24 * 60 * 60 * 1000),
          'rent.extended': (publication.rent.extended + 1),
        }
      });
    }
  },

  'publication.return'(publicationId) {
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
