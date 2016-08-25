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

    Meteor.call('patrons.search', searchValue, (err, data) => {
      console.log(err, data);
      
      if (err) {
        console.error(err); // TODO print error to form
      } else if (data) {
        console.log(data);
      }
    });
  },
});
