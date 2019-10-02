// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';

import configureStore from 'subApps/admin/store/configureStore';

type Props = {};

class AdminApp extends Component<Props> {
  store = null;

  constructor(props: Props) {
    super(props);
    this.store = configureStore({ admin: true });
  }

  render() {
    return (
      <Provider store={this.store}>
        <Link to="/main">to main</Link>
      </Provider>
    );
  }
}

export default AdminApp;
