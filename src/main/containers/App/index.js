import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProtectedRoute from 'main/containers/ProtectedRoute';

import Auth from 'main/containers/Auth';
import MainApp from 'main/containers/MainApp';
import styles from './App.module.scss';
// apps
const SalesApp = lazy(() => import('subApps/sales'));
const AdminApp = lazy(() => import('subApps/admin'));
const ProjectsApp = lazy(() => import('subApps/projects'));

class App extends Component<Props> {
  render() {
    return (
      <div className={styles.app}>
        <Switch>
          <Route path="/auth" component={Auth} />
          <ProtectedRoute path="/" component={MainApp} />
        </Switch>

        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <ProtectedRoute path="/sales" component={SalesApp} />
            <ProtectedRoute path="/admin" component={AdminApp} />
            <ProtectedRoute path="/projects" component={ProjectsApp} />
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
