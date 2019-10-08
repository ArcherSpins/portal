import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProtectedRoute from 'main/containers/ProtectedRoute';

import Auth from 'main/containers/Auth';
// apps
import SalesApp from 'subApps/sales';
import MainApp from 'main/containers/MainApp';
import './App.module.scss';

class App extends Component<Props> {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/auth" component={Auth} />
          <ProtectedRoute path="/" component={MainApp} />
        </Switch>
        <Switch>
          <ProtectedRoute exact path="/sales" component={SalesApp} />
          <ProtectedRoute exact path="/">
            <Redirect to="/sales" />
          </ProtectedRoute>
        </Switch>
      </div>
    );
  }
}

export default App;
