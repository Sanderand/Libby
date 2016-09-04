import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Libraries } from './libraries.js';
import { Publications } from './publications.js';


Meteor.methods({
  'public.library'(publicId) {
    if (!publicId) {
      throw new Meteor.Error('parameter-missing');
    }

    return Libraries.findOne({
      publicId: publicId,
      hasPublicPage: true,
    }, {
      fields: {
        _id: false,
        publicId: true,

        name: true,
        notes: true,
        organization: true,
        phone: true,
        email: true,
        address: true
      }
    });
  },

  'public.publications'(publicId) {
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
        fields: {
          title: true,
          author: true,
          publisher: true,
          type: true,
          year: true,
          length: true,
          subtitle: true,
          description: true,
          rating: true,
          'rent._id': true,
        }
      }).fetch();
    }
  },
});
