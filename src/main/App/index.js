import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ProtectedRoute from 'main/ProtectedRoute';

import Auth from 'main/Auth';
// apps
import AdminApp from 'subApps/admin/containers/AdminApp';
import MainApp from 'main/MainApp';
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
          <Route path="/" component={() => <div>No Route</div>} />
        </Switch>
      </div>
    );
  }
}

export default App;
