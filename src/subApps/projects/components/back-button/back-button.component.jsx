// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';

import type { Location, RouterHistory } from 'react-router-dom';

import './back-button.styles.scss';

type Props = {
  location: Location,
  history: RouterHistory
};

const BackButton = ({ location, history }: Props) => {
  if (location.pathname === '/') {
    return <div />;
  }
  return (
    <button type="button" className="back-button" onClick={() => history.goBack()}>
      <svg
        className="back-button-savg"
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.16434 6L7.04553 9.88119C7.41586 10.2515 7.41586 10.8519 7.04553 11.2223C6.67521 11.5926 6.07479 11.5926 5.70447 11.2223L1.15274 6.67053C0.782419 6.30021 0.782419 5.69979 1.15274 5.32947L5.70447 0.777744C6.07479 0.407419 6.67521 0.407419 7.04553 0.777744C7.41586 1.14807 7.41586 1.74848 7.04553 2.11881L3.16434 6Z"
          fill="#818A95"
        />
      </svg>
    </button>
  );
};

export default withRouter(BackButton);
