import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import * as constants from '../../constants.js';
import './libraryUser.html';


Template.libraryUser.events({
  'click .save-changes'(event, context) {
    const userId = FlowRouter.getParam('userId');

    if (userId === 'new') {
      // add new user TODO move into function
      const newUser = {
        email: context.find('[name=email]').value,
        role: context.find('[name=role]').value,
        password: context.find('[name=password]').value,
      };

      if (newUser.email && newUser.role && newUser.password) {
        Meteor.call('library.user.add', newUser, (err, res) => {
          if (err) {
            console.error(err);
          } else {
            FlowRouter.go('/app/library/');
          }
        });
      }
    } else {
      // update user TODO move into function
      const updateUser = {
        _id: userId,
        role: context.find('[name=role]').value,
      }

      if (updateUser._id && updateUser.role) {
        Meteor.call('library.user.update', updateUser, (err, res) => {
          if (err) {
            console.error(err);
          } else {
            FlowRouter.go('/app/library/');
          }
        });
      }
    }
  },

  'click .delete-user'() {
    const userId = FlowRouter.getParam('userId');
    Meteor.call('library.user.remove', userId, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        FlowRouter.go('/app/library/');
      }
    });
  },
});

Template.libraryUser.helpers({
  user: function() {
    if (Meteor.user()) {
      const userId = FlowRouter.getParam('userId');
      return Meteor.users.findOne({_id: userId});
    }

    return {};
  },

	roles() {
    var list = [];

    for (var key in constants.roles) {
      list.push(constants.roles[key]);
    }

		return list;
	},
});
