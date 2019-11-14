// @flow
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
// pages
import HomePage from '../../pages/Home';

// routes
import * as routes from '../../routes';
import './App.module.scss';

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <>
        <Switch>
          <Route exact path={routes.ROOT} component={HomePage} />
        </Switch>
      </>
    );
  }
}

export default App;
