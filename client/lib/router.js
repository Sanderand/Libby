import { Meteor } from 'meteor/meteor';

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('contentLayout', {
      content: 'home',
    });
  }
});

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('contentLayout', {
      content: 'notFound',
      sidebar: 'sidebar',
    });
  }
};

// AUTH

var authRoutes = FlowRouter.group({
  prefix: '/app',
  name: 'auth',
  triggersEnter: [function(context, redirect) {
    if (!Meteor.userId()) {
      redirect('/');
    }
  }],
});

authRoutes.route('/', {
  action: function() {
    BlazeLayout.render('contentLayout', {
      content: 'dashboard',
      sidebar: 'sidebar',
    });
  },
});

// PUBLICATIONS

authRoutes.route('/publications', {
  action: function() {
    BlazeLayout.render('contentLayout', {
      content: 'publicationList',
      sidebar: 'sidebar',
    });
  },
});

authRoutes.route('/publications/:publicationId', {
  action: function(params) {
    BlazeLayout.render('contentLayout', {
      content: 'publicationShow',
      sidebar: 'sidebar',
    });
  },
});

authRoutes.route('/publications/:publicationId/edit', {
  action: function(params) {
    BlazeLayout.render('contentLayout', {
      content: 'publicationEdit',
      sidebar: 'sidebar',
    })
  },
});

// STATS

authRoutes.route('/stats', {
  action: function() {
    BlazeLayout.render('contentLayout', {
      content: 'stats',
      sidebar: 'sidebar',
    });
  },
});

// SETTINGS

authRoutes.route('/settings', {
  action: function() {
    BlazeLayout.render('contentLayout', {
      content: 'settings',
      sidebar: 'sidebar',
    });
  },
});

// PATRONS

authRoutes.route('/patrons', {
  action: function() {
    BlazeLayout.render('contentLayout', {
      content: 'patronList',
      sidebar: 'sidebar',
    });
  },
});

authRoutes.route('/patrons/:patronId', {
  action: function(params) {
    BlazeLayout.render('contentLayout', {
      content: 'patronShow',
      sidebar: 'sidebar',
    });
  },
});

authRoutes.route('/patrons/:patronId/edit', {
  action: function(params) {
    BlazeLayout.render('contentLayout', {
      content: 'patronEdit',
      sidebar: 'sidebar',
    })
  },
});
