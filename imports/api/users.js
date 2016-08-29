import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.publish('libraryUsers', function () {
    if(!this.userId) return [];
    const user = Meteor.users.findOne(this.userId);

    return Meteor.users.find({
      libRef: user.profile.libRef,
    }, {
      fields: {
        username: true,
        role: true,
      }
    });
  });

  Meteor.users.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });
}
