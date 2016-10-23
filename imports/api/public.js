import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Libraries } from './libraries.js';
import { Publications } from './publications.js';
import { publicRequest, publicResponse, publicPublicationsRequest, publicPublicationsResponse } from './models/public.js';

Meteor.methods({
  'public.library'(publicId) {
    check(publicId, publicRequest);

    if (!publicId) {
      throw new Meteor.Error('parameter-missing');
    }

    return Libraries.findOne({
      publicId: publicId,
      hasPublicPage: true,
    }, {
      fields: publicResponse,
    });
  },

  'public.publications'(publicId) {
    check(publicId, publicPublicationsRequest);

    if (!publicId) {
      throw new Meteor.Error('parameter-missing');
    }

    const library = Libraries.findOne({
      publicId: publicId,
      hasPublicPage: true,
    }, {
      fields: {
        _id: true,
      }
    });

    if (library) {
      return Publications.find({
        libRef: library._id,
      }, {
        limit: 100,
        fields: publicPublicationsResponse,
      }).fetch();
    }
  },
});
