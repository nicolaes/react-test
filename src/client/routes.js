import React from 'react'
import {DefaultRoute, Redirect, NotFoundRoute, Route}
    from 'react-router'

import App from './components/app';
import HomePage from './pages/home-page';
import MatchPage from './pages/match-page';
import MatchForm from './pages/match-form';

export default (
  <Route handler={App}>
    <DefaultRoute handler={HomePage} name="home" />
    <Route handler={MatchPage} name="match" />
    <Route handler={MatchForm} name="match-form" />

  </Route>
)
