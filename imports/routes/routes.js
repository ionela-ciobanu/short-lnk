import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router';
import {Route, Router, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];
const customHistory = createBrowserHistory();


export const onAuthChange = (isAuthenticated) => {
  const pathname = customHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    customHistory.replace('/links');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    customHistory.replace('/');
  }
}

export const routes = (
  <Router history={customHistory}>
      <Switch>
        <Route exact path='/' render={() => (
          Meteor.userId() ?
          ( <Redirect to="/links"/> ) : ( <Login/> ) ) } />
        <Route path='/signup' render={() => (
          Meteor.userId() ?
          ( <Redirect to="/links"/> ) : ( <Signup/> ) ) } />
        <Route path='/links' render={() => (
          !Meteor.userId() ?
          ( <Redirect to="/"/> ) : ( <Link/> ) ) } />
        <Route render={() => (<NotFound/>)}/>
      </Switch>
  </Router>
);
