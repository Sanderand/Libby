import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './searchBar.html';

Template.searchBar.events({
  'submit .search-bar'(event) {
    event.preventDefault();

    const target = event.target;
    const searchValue = target.searchValue.value;

    console.log('searching for ' + searchValue);
    target.searchValue.value = '';
  },
});
