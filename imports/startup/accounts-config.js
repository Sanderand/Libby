import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Accounts.onLogin(() => {
  const currentPath = FlowRouter._current.path;
  const appDefaultPath = '/app/';

  if (currentPath.indexOf(appDefaultPath) === -1) {
    FlowRouter.go(appDefaultPath);
  }
});

Accounts.onLogout(() => {
  console.log('logged out');
  FlowRouter.go('/');
});
