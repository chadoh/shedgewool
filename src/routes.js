import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.js';
import Schedule from './components/Schedule.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Schedule}/>
  </Route>
);
