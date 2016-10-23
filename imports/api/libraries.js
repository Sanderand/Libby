import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

import * as constants from '../constants.js';
import {
  libraryResponse,
  libraryUpsertRequest,
  librarySetPublicPageRequest,
  librarySetRentDaysRequest,
  librarySetExtendDaysRequest,
  librarySetMaxExtendsRequest,
  librarySetMaxExtendsResponse,
  librarySetNonAdminAddUsersRequest,
  libraryUserAddRequest,
  libraryUserRemoveRequest,
  libraryUserUpdateRequest
} from './models/libraries.js';
export const Libraries = new Mongo.Collection('libraries');


if (Meteor.isServer) {
  Meteor.publish('libraries', function() {
    if(!this.userId) return [];
    const user = Meteor.users.findOne(this.userId);

    return Libraries.find({
      _id: user.profile.libRef,
    }, {
      fields: libraryResponse,
    });
  });

  Libraries.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });
}

Meteor.methods({
  // returns the number of maxExtends for publications
  'libraries.maxExtends'() {
    const libRef = Meteor.user().profile.libRef;

    return Libraries.findOne({
      _id: libRef,
    }, {
      fields: librarySetMaxExtendsResponse,
    });
  },

  // creates or updates library details
  'libraries.upsert'(library) {
    const libRef = Meteor.user().profile.libRef;

    check(library, libraryUpsertRequest);

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

  'libraries.setPublicPage'(hasPublicPage) {
    const user = Meteor.user();
    const libRef = user.profile.libRef;

    if (user.profile.role === constants.roles.admin) {
      check(hasPublicPage, librarySetPublicPageRequest);

      return Libraries.update(libRef, {
        $set: {
          hasPublicPage: hasPublicPage,
        }
      });
    }
  },

  'libraries.setRentDays'(rentDays) {
    const user = Meteor.user();
    const libRef = user.profile.libRef;

    if (user.profile.role === constants.roles.admin) {
      check(rentDays, librarySetRentDaysRequest);
      rentDays = parseInt(rentDays);

      return Libraries.update(libRef, {
        $set: {
          rentDays: rentDays,
        }
      });
    }
  },

  'libraries.setExtendDays'(extendDays) {
    const user = Meteor.user();
    const libRef = user.profile.libRef;

    if (user.profile.role === constants.roles.admin) {
      check(extendDays, librarySetExtendDaysRequest);
      extendDays = parseInt(extendDays);

      return Libraries.update(libRef, {
        $set: {
          extendDays: extendDays,
        }
      });
    }
  },

  'libraries.setMaxExtends'(maxExtends) {
    const user = Meteor.user();
    const libRef = user.profile.libRef;

    if (user.profile.role === constants.roles.admin) {
      check(maxExtends, librarySetMaxExtendsRequest);
      maxExtends = parseInt(maxExtends);

      return Libraries.update(libRef, {
        $set: {
          maxExtends: maxExtends,
        }
      });
    }
  },

  'libraries.setNonAdminAddUsers'(nonAdminsCanAddUsers) {
    const user = Meteor.user();
    const libRef = user.profile.libRef;

    if (user.profile.role === constants.roles.admin) {
      check(nonAdminsCanAddUsers, librarySetNonAdminAddUsersRequest);

      return Libraries.update(libRef, {
        $set: {
          nonAdminsCanAddUsers: nonAdminsCanAddUsers,
        }
      });
    }
  },

  'library.user.add'(newUser) {
    const user = Meteor.user();
    const libRef = user.profile.libRef;

    check(newUser, libraryUserAddRequest);

    const queryUser = Meteor.users.findOne({
      username: newUser.email,
    });

    if (!libRef) {
      throw new Meteor.Error('library-not-found');
    }

    if (queryUser) {
      throw new Meteor.Error('user-already-exists');
    }

    return Accounts.createUser({
      email: newUser.email,
      username: newUser.email,
      password: newUser.password,
      profile: {
        role: newUser.role,
        libRef: libRef,
      },
    });
  },

  'library.user.update'(updateUser) {
    check(updateUser, libraryUserUpdateRequest);

    const updatingUser = Meteor.user();
    const updatedUser = Meteor.users.findOne({_id: updateUser._id});

    if (!updatedUser) {
      throw new Meteor.Error('updated-user-not-found');
    }

    if (!updatingUser) {
      throw new Meteor.Error('updating-user-not-found');
    }

    const updatinglibRef = updatingUser.profile.libRef;
    const updatedlibRef = updatedUser.profile.libRef;

    if (updatedlibRef !== updatinglibRef) {
      throw new Meteor.Error('no-lib-ref-match');
    }

    return Meteor.users.update({
      _id: updateUser._id
    }, {
      $set: {
        'profile.role': updateUser.role,
      },
    });
  },

  'library.user.remove'(userId) {
    check(userId, libraryUserRemoveRequest);

    const removingUser = Meteor.user();
    const removedUser = Meteor.users.findOne({_id: userId});

    if (!removedUser) {
      throw new Meteor.Error('removed-user-not-found');
    }

    if (!removingUser) {
      throw new Meteor.Error('removing-user-not-found');
    }

    const removinglibRef = removingUser.profile.libRef;
    const removedlibRef = removedUser.profile.libRef;

    if (removedlibRef !== removinglibRef) {
      throw new Meteor.Error('no-lib-ref-match');
    }

    return Meteor.users.remove({
      _id: userId
    });
  },
});
