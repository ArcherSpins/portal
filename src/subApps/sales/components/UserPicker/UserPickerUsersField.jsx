// @flow
import React from 'react';
import FieldItem from './UserPickerUsersFieldItem';
import type { User } from './UserPicker';
import './userPickerUsersField.scss';

type UsersFieldProps = {
  deleteUser: () => void,
  users: Array<User>
}

const UsersField = ({ deleteUser, users = [] }: UsersFieldProps) => (
  <div className="user-picker-users-field">
    {users.map((user) => (
      <FieldItem
        name={user.name}
        id={user.id}
        key={user.id}
        deleteUser={deleteUser}
      />
    ))}
  </div>
);

export default UsersField;
