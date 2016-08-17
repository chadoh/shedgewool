import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import Root from './components/Root';
import createStore from './redux/create.js';
import './styles/index.css';

const store = createStore();

ReactDOM.render(
  <Root store={store} history={browserHistory} />,
  document.getElementById('root')
);
