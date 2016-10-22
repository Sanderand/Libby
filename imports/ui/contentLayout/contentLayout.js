import './contentLayout.html';


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
