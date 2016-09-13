import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import * as constants from '../constants.js';
import './libraryAdd.html';


Template.libraryAdd.events({
  'click .save-changes'(event, context) {
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
  },
});

Template.libraryAdd.helpers({
	roles() {
    var list = [];

    for (var key in constants.roles) {
      list.push(constants.roles[key]);
    }

		return list;
	}
});
