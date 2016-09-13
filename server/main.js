import { Meteor } from 'meteor/meteor';
import { AccountsServer } from 'meteor/accounts-base'

import { Users } from '../imports/api/users.js';
import { Libraries } from '../imports/api/libraries.js';
import { Logs } from '../imports/api/logs.js';
import { Patrons } from '../imports/api/patrons.js';
import { Publications } from '../imports/api/publications.js';
import { Books } from '../imports/api/books.js';
import { Quotes } from '../imports/api/quotes.js';
import { Public } from '../imports/api/public.js';


Meteor.startup(() => {
  console.log('hello');
});

Accounts.onCreateUser(function(options, user) {
  const createdByAdmin = (!!options.profile.libRef);

  user.profile = options.profile || {};
  user.profile.role = options.profile.role || 'ADMIN';
  user.profile.libRef = options.profile.libRef || Random.id();

  if (!createdByAdmin) {
    Libraries.upsert({
      _id: user.profile.libRef,
    }, {
      $set: {
        name: 'My Library',

        hasPublicPage: false,
        publicId: Random.id(),
        nonAdminsCanAddUsers: false,

        rentDays: 30,
        extendDays: 15,
        maxExtends: 1,

      }
    });
  }

  return user;
});
