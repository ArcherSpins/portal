// @flow
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from 'utils/constants';
import Login from './Login';
import Logout from './Logout';
import SendResetToken from './SendResetToken';
import ResetPassword from './ResetPassword';

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
    const isAuthenticated = !!localStorage.getItem(AUTH_TOKEN_KEY);
    this.setState({
      isAuthenticated,
    });
  }

  render() {
    const { isAuthenticated } = this.state;
    return (
      <>
        {isAuthenticated ? (
          <Switch>
            <Route exact path="/auth/logout" component={Logout} />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/auth/login" component={Login} />
            <Route exact path="/auth/reset-password" component={SendResetToken} />
            <Route exact path="/auth/reset-password/:token" component={ResetPassword} />
            <Route exact path="/auth/logout" component={Logout} />
            <Redirect to="/auth/login" />
          </Switch>
        ) }
      </>
    );
  }
}

export default Auth;
