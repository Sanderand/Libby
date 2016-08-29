import { Meteor } from 'meteor/meteor';
import { AccountsServer } from 'meteor/accounts-base'

import '../imports/api/users.js';
import '../imports/api/libraries.js';
import '../imports/api/patrons.js';
import '../imports/api/publications.js';
import '../imports/api/books.js';
import '../imports/api/quotes.js';


Meteor.startup(() => {
  console.log('hello');
});

Accounts.onCreateUser(function(options, user) {
  user.profile = options.profile || {};
  user.profile.role = 'ADMIN';
  user.profile.libRef = Random.id();

  return user;
});
