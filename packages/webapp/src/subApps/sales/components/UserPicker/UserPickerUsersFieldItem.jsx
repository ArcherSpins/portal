// @flow
import React from 'react';

import './userPickerUsersFieldItem.scss';

type FieldItemProps = {
  name: string,
}

const FieldItem = ({ name }: FieldItemProps) => (
  <div className="user-picker-users-field-item">
    <span className="user-picker-users-field-item__name">{name}</span>
  </div>
);

export default FieldItem;
