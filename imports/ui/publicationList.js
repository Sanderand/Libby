import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Publications } from '../api/publications.js';
import './publicationListItem.js';
import './publicationList.html';

Template.publicationList.onCreated(() => {
  Meteor.subscribe('publications');

  // Meteor.call('publications.with.rent', (err, data) => {
  //   console.log(data, err);
  // });
});

Template.publicationList.helpers({
  publications() {
    return Publications.find({}, { sort: { createdAt: -1 } });
  },
});
