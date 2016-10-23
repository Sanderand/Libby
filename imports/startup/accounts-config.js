'use strict';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


const ACCOUNTS_CONFIGURATION = {
  passwordSignupFields: 'USERNAME_ONLY',
}

Deps.autorun(autoRunDependencies);
Accounts.ui.config(ACCOUNTS_CONFIGURATION);
Accounts.onLogin(onLogin)
Accounts.onLogout(onLogout);

// implementation

function autoRunDependencies() {
  Meteor.subscribe('users');
}

function onLogin() {
  const authPath = '/app/';
  const publicPath = '/public/';
  const currentPath = FlowRouter._current.path;
  const isAuthPath = (currentPath.indexOf(authPath) !== -1);
  const isPublicPath = (currentPath.indexOf(publicPath) !== -1);

  if (!isAuthPath && !isPublicPath) {
    FlowRouter.go(authPath);
  }
}

function onLogout() {
  console.log('logged out');
  FlowRouter.go('/');
}
