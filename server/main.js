import { Meteor } from 'meteor/meteor';
import { AccountsServer } from 'meteor/accounts-base'

import { Users } from '../imports/api/users.js';
import { Libraries } from '../imports/api/libraries.js';
import { Patrons } from '../imports/api/patrons.js';
import { Publications } from '../imports/api/publications.js';
import { Books } from '../imports/api/books.js';
import { Quotes } from '../imports/api/quotes.js';


Meteor.startup(() => {
  console.log('hello');
});

Accounts.onCreateUser(function(options, user) {
  user.profile = options.profile || {};
  user.profile.role = 'ADMIN';
  user.profile.libRef = Random.id();

  Libraries.upsert({
    _id: user.profile.libRef,
  }, {
    $set: {
      name: 'My Library',
      hasPublicPage: false,
      rentDays: 30,
      extendDays: 15,
    }
  });

  return user;
});
