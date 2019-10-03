import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ProtectedRoute from 'main/containers/ProtectedRoute';

import Auth from 'main/containers/Auth';
// apps
import AdminApp from 'subApps/admin/containers/AdminApp';
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
          <ProtectedRoute exact path="/admin" component={AdminApp} />
        </Switch>
      </div>
    );
  }
}

export default App;
