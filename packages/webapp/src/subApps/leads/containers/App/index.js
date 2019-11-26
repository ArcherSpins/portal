// @flow
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import classnames from 'classnames';
import { HeaderLeads } from '../../components';
// pages
import HomePage from '../../pages/Home';

// routes
import * as routes from '../../routes';
import styles from './App.module.scss';
import './style.scss';

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <div className={classnames(styles['app-leads'], 'app-container')}>
        <HeaderLeads />
        <Switch>
          <Route exact path={routes.ROOT} component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
