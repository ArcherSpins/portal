/* eslint-disable react/no-unused-state */
// @flow

import React from 'react';
import User from './UserPickerUser';
import './userPickerList.scss';
import type { User as UserType } from './UserPicker';

type ListProps = {
  users: Array<UserType>,
  pickUser: (string) => void,
  defaultImage: string,
  search: boolean,
}

const List = ({
  users, pickUser, defaultImage, search,
}: ListProps) => (
  <div
    className={(search && 'user-picker-list animate') || 'user-picker-list'}
  >
    <p className="list__header">Choose a participant</p>
    {users.length >= 1 ? (
      users.map((user) => (
        <User
          defaultImage={defaultImage}
          name={user.name}
          url={user.url}
          pickUser={pickUser}
          key={user.id}
          id={user.id}
        />
      ))
    ) : (
      <span className="not-found-message">Not found</span>
    )}
  </div>
);

export default List;
