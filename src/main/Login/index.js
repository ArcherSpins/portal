// @flow
import React, { Component } from 'react';
import history from 'utils/history';
import { Button } from 'ui-kit';

type Props = {}

class Login extends Component<Props> {
  onLogin = () => {
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
    history.push('/admin');
  }

  render() {
    return (
      <Button
        onClick={this.onLogin}
      >
        Log In
      </Button>
    );
  }
}

export default Login;
