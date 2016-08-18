import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Schedule from './components/Schedule';
import Day from './components/Day';
import Session from './components/Session';

export default (
  <Route path="/" component={App}>
    <Route path=":day" component={Day}>
      <Route path=":sessionId" component={Session}/>
    </Route>
    <IndexRoute component={Schedule}/>
  </Route>
);
