import React from 'react'
import {DefaultRoute, Redirect, NotFoundRoute, Route} from 'react-router'

import App from './components/app';
import HomePage from './pages/home-page';

export default (
  <Route handler={App}>
    <DefaultRoute handler={HomePage} name="home" />
  </Route>
)
