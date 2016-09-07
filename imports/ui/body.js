// templates + logic

import './patronList.js';
import './patron.js';

import './publicationList.js';
import './publication.js';
import './publicationRent.js';

import './rentList.js';

import './logoutConfirm.js';
import './home.js';
import './dashboard.js';
import './stats.js';
import './library.js';
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
});
