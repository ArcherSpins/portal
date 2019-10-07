// @flow
import React, { type ComponentType } from 'react';
import { Route, Redirect, type LocationShape } from 'react-router-dom';

// import client from 'utils/api';

import { AUTH_TOKEN_KEY } from 'utils/constants';
// import { GET_SELF_INFO } from 'graphql/auth';

type Props = {
  component: ComponentType<*>,
  location: LocationShape
}

class PrivateRoute extends React.Component<Props> {
  isAuthenticated: boolean = false;

  getComponent = () => {
    const { component: Component, location } = this.props;

    this.checkAuthState();

    if (this.isAuthenticated) {
      return <Component {...this.props} />;
    }
    return (
      <Redirect
        to={{
          pathname: '/auth/login',
          state: { from: location },
        }}
      />
    );
  }

  checkAuthState() {
    this.isAuthenticated = !!localStorage.getItem(AUTH_TOKEN_KEY);
  }

  render() {
    const { ...rest } = this.props;
    return (
      <Route
        {...rest}
        component={this.getComponent}
      />
    );
  }
}
export default PrivateRoute;
