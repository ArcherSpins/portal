// @flow

import { Component } from 'react';
import client from 'utils/api';
import history from 'utils/history';

import { SIGN_OUT } from 'graphql/auth';
import { AUTH_TOKEN_KEY } from 'utils/constants';

class Logout extends Component<{}> {
  componentDidMount() {
    this.logout();
  }

  logout = async () => {
    await client.mutate({
      mutation: SIGN_OUT,
    });
    localStorage.removeItem(AUTH_TOKEN_KEY);
    history.push('/');
  }

  render() {
    return null;
  }
}

export default Logout;
