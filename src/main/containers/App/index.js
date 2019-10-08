import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProtectedRoute from 'main/containers/ProtectedRoute';

import Auth from 'main/containers/Auth';
import MainApp from 'main/containers/MainApp';
import './App.module.scss';
// apps
const SalesApp = lazy(() => import('subApps/sales'));

class App extends Component<Props> {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/auth" component={Auth} />
          <ProtectedRoute path="/" component={MainApp} />
        </Switch>

        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <ProtectedRoute path="/sales" component={SalesApp} />
            <ProtectedRoute path="/admin" component={() => <div>Here is admin</div>} />
            <ProtectedRoute exact path="/">
              <Redirect to="/sales" />
            </ProtectedRoute>
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default App;
