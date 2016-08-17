import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import RouterRoot from '../routes';

class Root extends Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired,
  }

  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <Router history={history} routes={RouterRoot} />
      </Provider>
    );
  }
}

export default Root;
