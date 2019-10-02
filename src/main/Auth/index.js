// @flow
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from 'main/Login';

type Props = {};
type State = {
  isAuthenticated: boolean
}

class Auth extends Component<Props, State> {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    const isAuthenticated = !!localStorage.getItem('isAuthenticated');
    this.setState({
      isAuthenticated,
    });
  }

  render() {
    const { isAuthenticated } = this.state;
    return (
      <>
        {isAuthenticated ? <Redirect to="/" /> : (
          <Switch>
            <Route exact path="/auth/login" component={Login} />
            <Route exact path="/auth/restore-password" component={() => <div>Restore password</div>} />
            <Redirect to="/auth/login" />
          </Switch>
        ) }
      </>
    );
  }
}

export default Auth;
