import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
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
  <Root store={store} history={browserHistory} />,
  document.getElementById('root')
);
