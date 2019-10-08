/* eslint-disable react/no-unused-state */
// @flow
import React from 'react';
import './style.scss';

export type ErrorBoundryProps = {
  message: string,
}

// eslint-disable-next-line import/prefer-default-export
export const ErrorBoundry = ({ message }: ErrorBoundryProps) => (
  <div className="error-boundry">
    <div>
      <h2>{message}</h2>
    </div>
  </div>
);
