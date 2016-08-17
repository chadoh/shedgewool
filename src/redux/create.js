import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/root';
import reducer from './reducers/root';

export default function createStore(data) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const store = _createStore(reducer, data, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  sagaMiddleware.run(rootSaga);
  return store;
}
