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

authRoutes.route('/logout', {
  action: function() {
    BlazeLayout.render('contentLayout', {
      content: 'logoutConfirm',
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
  action: function() {
    BlazeLayout.render('contentLayout', {
      content: 'publication',
      sidebar: 'sidebar',
    });
  },
});

authRoutes.route('/publications/:publicationId/rent', {
  action: function() {
    BlazeLayout.render('contentLayout', {
      content: 'publicationRent',
      sidebar: 'sidebar',
    });
  },
});

// RENTS

authRoutes.route('/rents/', {
  action: function() {
    BlazeLayout.render('contentLayout', {
      content: 'rentList',
      sidebar: 'sidebar',
    });
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

// LIBRARY

authRoutes.route('/library', {
  action: function() {
    BlazeLayout.render('contentLayout', {
      content: 'library',
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
  action: function() {
    BlazeLayout.render('contentLayout', {
      content: 'patron',
      sidebar: 'sidebar',
    });
  },
});
