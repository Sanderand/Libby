import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


Deps.autorun(function() {
  Meteor.subscribe('users');
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Accounts.onLogin(() => {
  const authPath = '/app/';
  const publicPath = '/public/';
  const currentPath = FlowRouter._current.path;
  const isAuthPath = (currentPath.indexOf(authPath) !== -1);
  const isPublicPath = (currentPath.indexOf(publicPath) !== -1);

  if (!isAuthPath && !isPublicPath) {
    FlowRouter.go(authPath);
  }
});

Accounts.onLogout(() => {
  console.log('logged out');
  FlowRouter.go('/');
});
