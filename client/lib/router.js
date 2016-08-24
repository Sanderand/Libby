FlowRouter.route('/', {
  action: function() {
    console.log('TROLL');
    BlazeLayout.render('contentLayout', {
      content: 'list',
      sidebar: 'sidebar',
    });
  }
});

FlowRouter.route('/:postId', {
  action: function(a,b) {
    console.log(a,b);
    BlazeLayout.render('contentLayout', {
      content: 'item',
      sidebar: 'sidebar',
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

//
// FlowRouter.route('/blog/:postId', {
//   action: function(params, queryParams) {
//     console.log('Yeah! We are on the post:', params.postId);
//   },
// });
//
// var adminRoutes = FlowRouter.group({
//   prefix: '/admin',
//   name: 'admin',
//   triggersEnter: [function(context, redirect) {
//     console.log('running group triggers');
//   }],
// });
//
// // handling /admin route
// adminRoutes.route('/', {
//   action: function() {
//     BlazeLayout.render('componentLayout', {content: 'admin'});
//   },
//   triggersEnter: [function(context, redirect) {
//     console.log('running /admin trigger');
//   }],
// });
//
// // handling /admin/posts
// adminRoutes.route('/posts', {
//   action: function() {
//     BlazeLayout.render('componentLayout', {content: 'posts'});
//   },
// });
