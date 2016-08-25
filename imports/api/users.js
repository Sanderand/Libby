import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

if (Meteor.isServer) {
  Meteor.users.deny({
    update: function () {
      return true;
    }
  });
}
