// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';

import type { Location, RouterHistory } from 'react-router-dom';
import { ROOT } from '../../routes';

import './back-button.styles.scss';

type Props = {
  location: Location,
  history: RouterHistory
};

const BackButton = ({ location, history }: Props) => {
  if (location.pathname === ROOT) {
    return null;
  }

  return (
    <button data-test="nav__back-button" type="button" className="back-button" onClick={() => history.goBack()}>
      <i className="icon-left-open" />
    </button>
  );
};

export default withRouter(BackButton);
