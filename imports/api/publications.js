import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

import * as constants from '../constants.js';
import { sanitizeISBN } from '../shared.js';
import { Libraries } from './libraries.js';
import {
  publicationResponse,
  publicationUpsertRequest,
  publicationRateRequest,
  publicationTagAddRequest,
  publicationTagRemoveRequest,
  publicationRentRequest,
  publicationRemoveRequest,
  publicationExtendRequest,
  publicationReturnRequest
} from './models/publications.js';
export const Publications = new Mongo.Collection('publications');


if (Meteor.isServer) {
  Meteor.publish('publications', function() {
    if(!this.userId) return [];
    const user = Meteor.users.findOne(this.userId);

    return Publications.find({
      libRef: user.profile.libRef,
      deleted: false,
    }, {
      fields: publicationResponse,
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
    check(publicationId, publicationRemoveRequest);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Publications.update(publicationId, {
      $set: {
        deleted: true,
        deleted_at: new Date(),
      }
    });
  },

  'publications.upsert'(publication) {
    check(publication, publicationUpsertRequest);

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
        isbn: sanitizeISBN(publication.isbn),
        barcode: publication.barcode,
        subtitle: publication.subtitle,
        description: publication.description,
      }
    });
  },

  'publications.rate'(request) {
    check(request, publicationRateRequest);

    return Publications.update(request.publicationId, {
      $set: {
        rating: request.rating,
      }
    });
  },

  'publications.tag.add'(request) {
    check(request, publicationTagAddRequest);

    return Publications.update(request.publicationId, {
      $addToSet: {
        tags: request.tagName,
      }
    });
  },

  'publications.tag.remove'(request) {
    check(request, publicationTagRemoveRequest);

    return Publications.update(request.publicationId, {
      $pull: {
        tags: request.tagName,
      }
    });
  },

  'publication.rent'(request) {
    check(request, publicationRentRequest);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // check if not rented yet
    const matchingRentedPublications = Publications.find({
      _id: request.publicationId,
      rent: {
        $exists: true,
      }
    }).count();

    if (matchingRentedPublications) {
      throw new Meteor.Error('not-available');
    }

    const library = Libraries.findOne({
      _id: Meteor.user().profile.libRef,
    });

    if (library) {
      const rentDays = library.rentDays;

      return Publications.update(request.publicationId, {
        $set: {
          'rent.start_at': new Date(),
          'rent.end_at': new Date(Date.now() + rentDays * 24 * 60 * 60 * 1000),
          'rent.borrowerId': request.borrowerId,
          'rent.extended': 0,
        }
      });
    }
  },

  'publication.extend'(publicationId) {
    check(publicationId, publicationExtendRequest);

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
    check(publicationId, publicationReturnRequest);

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
