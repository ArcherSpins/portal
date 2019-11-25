// @flow
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { HeaderLeads } from '../../components';
// pages
import HomePage from '../../pages/Home';

// routes
import * as routes from '../../routes';
import styles from './App.module.scss';

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <div className={styles['app-leads']}>
        <HeaderLeads />
        <Switch>
          <Route exact path={routes.ROOT} component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
