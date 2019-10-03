// @flow
import React, { type ComponentType } from 'react';
import { Route, Redirect, type LocationShape } from 'react-router-dom';

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

  checkAuthState(): void {
    this.isAuthenticated = !!localStorage.getItem('isAuthenticated');
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