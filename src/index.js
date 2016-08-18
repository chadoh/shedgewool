import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import { loadState, saveState } from './helpers/localStorage';
import Root from './components/Root';
import createStore from './redux/create';
import './styles/index.css';

const persistedState = loadState();
const store = createStore(persistedState);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Root store={store} history={hashHistory} />,
  document.getElementById('root')
);
