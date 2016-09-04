import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import * as constants from '../constants.js';
export const Logs = new Mongo.Collection('logs');


if (Meteor.isServer) {
  Meteor.publish('logs', function() {
    if (!this.userId) return [];
    const user = Meteor.users.findOne(this.userId);

    return Logs.find({
      libRef: user.profile.libRef,
    }, {

    });
  });

  Logs.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });
}

Meteor.methods({
  'logs.rent'() {},
  'logs.extend'() {},
  'logs.return'() {},

  'logs.libraries.add'() {},
  'logs.libraries.update'() {},
  'logs.libraries.remove'() {},

  'logs.patron.add'() {},
  'logs.patron.update'() {},
  'logs.patron.remove'() {},

  'logs.publication.add'() {},
  'logs.publication.update'() {},
  'logs.publication.remove'() {},
});
