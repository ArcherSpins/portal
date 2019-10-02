import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ProtectedRoute from 'containers/ProtectedRoute';

import Auth from 'containers/Auth';
// apps
import AdminApp from 'apps/admin/containers/AdminApp';
import MainApp from 'containers/MainApp';
import './App.module.scss';

class App extends Component<Props> {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" component={MainApp} />
        </Switch>
        <Switch>
          <ProtectedRoute exact path="/admin" component={AdminApp} />
          <div>No route</div>
        </Switch>
      </div>
    );
  }
}

export default App;
