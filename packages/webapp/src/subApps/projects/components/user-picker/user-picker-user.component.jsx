/* eslint-disable global-require */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// @flow
// TODO: FIX THIS
import React from 'react';

import './user-picker-user.styles.scss';

type Props = {
  firstName: string,
  lastName: string,
  url: string,
  id: string,
  pickUser: (id: string) => void
};

const User = (props: Props) => (
  <div onClick={() => props.pickUser(props.id)} className="user-picker-user">
    <img
      className="user__avatar"
      src={require('./avatar.png')}
      alt="avatar"
    />
    <span className="user__name">
      {props.firstName}
      {' '}
      {props.lastName}
    </span>
  </div>
);

export default User;
