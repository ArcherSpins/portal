// @flow
// TODO: FIX THIS
import React from 'react';
import FieldItem from './user-picker-users-field-item.component';

import './user-picker-users-field.styles.scss';

type Props = {
  deleteUser: (id: string) => void,
  users: Array<{
    id: string,
    firstName: string,
    lastName: string,
    name: string
  }>
};

const UsersField = ({ users, deleteUser }: Props) => (
  <div className="user-picker-users-field">
    {users
      && users.map((user) => (
        <FieldItem
          firstName={user.firstName}
          lastName={user.lastName}
          id={user.id}
          key={user.id}
          deleteUser={deleteUser}
        />
      ))}
  </div>
);

export default UsersField;
