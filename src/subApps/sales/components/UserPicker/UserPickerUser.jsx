// @flow
import React from 'react';

import './userPickerUser.scss';

type UserProps = {
  name: string,
  url?: string,
  id: string,
  pickUser: (string) => void,
  defaultImage: string
}

const User = ({
  name, url, id, pickUser, defaultImage,
}: UserProps) => (
  <div
    onClick={() => pickUser(id)}
    className="user-picker-user"
    role="button"
    onKeyDown={() => {}}
    tabIndex={id}
  >
    <div
      className="user__avatar"
      style={{
        backgroundImage: `url(${url || defaultImage})`,
        backgroundPosition: 'center',
      }}
    />
    {/* <img className="user__avatar" src={url || defaultImage} alt="avatar" /> */}
    <span className="user__name">{name}</span>
  </div>
);

User.defaultProps = {
  url: null,
};

export default User;
