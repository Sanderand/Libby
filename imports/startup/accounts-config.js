import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


Deps.autorun(function() {
  Meteor.subscribe('users');
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Accounts.onLogin(() => { // TODO refactor
  const currentPath = FlowRouter._current.path;
  const appDefaultPath = '/app/';
  const publicPath = '/public/';
  const isAuthPath = (currentPath.indexOf(appDefaultPath) !== -1);
  const isPublicPath = (currentPath.indexOf(publicPath) !== -1);

  if (!isAuthPath && !isPublicPath) { // force-redirect to auth path
    FlowRouter.go(appDefaultPath);
  }
});

Accounts.onLogout(() => {
  console.log('logged out');
  FlowRouter.go('/');
});
