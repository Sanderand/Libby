import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.publish('libraryUsers', function () {
    if(!this.userId) return [];
    const user = Meteor.users.findOne(this.userId);

    return Meteor.users.find({
      libRef: user.profile.libRef,
    });
  });

  Meteor.users.deny({
    update: function () {
      return true;
    }
  });
}
