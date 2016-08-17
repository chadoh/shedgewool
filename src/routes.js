import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Schedule from './components/Schedule';
import Day from './components/Day';

export default (
  <Route path="/" component={App}>
    <Route path=":day" component={Day}/>
    <IndexRoute component={Schedule}/>
  </Route>
);
