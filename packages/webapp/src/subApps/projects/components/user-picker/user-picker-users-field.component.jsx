// @flow
// TODO: FIX THIS
import React from 'react';
import { Chip } from '@sfxdx/ui-kit';

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
        <Chip
          title={`${user.firstName} ${user.lastName}`}
          key={user.id}
          id={user.id}
          onDelete={deleteUser}
        />
      ))}
  </div>
);

export default UsersField;
