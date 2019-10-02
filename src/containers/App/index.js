// @flow
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
// pages
import HomePage from 'pages/Home';
import NotFoundPage from 'pages/NotFound';

import './App.module.scss';

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
