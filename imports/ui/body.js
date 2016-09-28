// templates + logic

import './borrowerList.js';
import './borrower.js';

import './publicationList.js';
import './publication.js';
import './publicationRent.js';
import './publicationActions.js';

import './library.js';
import './libraryUser.js';

import './logoutConfirm.js';
import './home.js';
import './dashboard.js';
import './stats.js';
import './settings.js';

import './publicProfile.js';

// pure templates

import './body.html';
import './sidebar.html';
import './notFound.html';

// contentLayout-wide events

Template.contentLayout.events({
	'click .sidebar-toggle': function(e) {
    $('aside').toggleClass('open');
	},

	'click aside a': function(e) {
    $('aside').removeClass('open');
	},

	'click .pill': function(e) {
    $('.pill').removeClass('selected');
		e.currentTarget.classList.add('selected');
	},
});
