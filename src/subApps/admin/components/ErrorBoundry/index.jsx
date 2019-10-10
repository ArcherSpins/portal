/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-unused-state */
// TODO: сделать экспорт по умолчанию
// @flow
import React from 'react';
import './style.scss';

type ErrorBoundryProps = {
  message: string,
}

const ErrorBoundry = ({ message }: ErrorBoundryProps) => (
  <div className="error-boundry">
    <div>
      <img
        src="https://www.econolease.com/images/message/robot-msg-error.png"
        alt="error"
      />
      <h2>{message}</h2>
    </div>
  </div>
);

export {
  ErrorBoundry,
};
