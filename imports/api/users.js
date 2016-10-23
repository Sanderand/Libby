import { Meteor } from 'meteor/meteor';

import { userResponse } from './models/users.js';

if (Meteor.isServer) {
  Meteor.publish('libraryUsers', function () {
    if(!this.userId) return [];
    const user = Meteor.users.findOne(this.userId);

    return Meteor.users.find({
      'profile.libRef': user.profile.libRef,
    }, {
      fields: userResponse,
    });
  });

  Meteor.users.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });
}
