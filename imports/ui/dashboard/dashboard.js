import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Quotes } from '../../api/quotes.js';
import './dashboard.html';


Template.dashboard.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.set('randomQuote', Quotes.getRandomQuote());
});

Template.dashboard.events({
  'click .next-quote'() {
    Template.instance().state.set('randomQuote', Quotes.getRandomQuote());
  },
});

Template.dashboard.helpers({
  randomQuote() {
    return Template.instance().state.get('randomQuote');
  },
});
