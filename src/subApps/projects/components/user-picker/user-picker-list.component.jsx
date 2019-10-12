// @flow
import React from 'react';
// $FlowFixMe
import onClickOutside from 'react-onclickoutside';

import User from './user-picker-user.component';

import './user-picker-list.styles.scss';

type Props = {
  users: Array<{
    id: string,
    firstName: string,
    lastName: string,
    url: string
  }>,
  pickUser: (id: string) => void,
  toggle: () => void
};

class List extends React.Component<Props> {
  handleClickOutside = () => {
    const { toggle } = this.props;
    toggle();
  };

  render() {
    const { users, pickUser } = this.props;
    return (
      <div
        className={
          users.length >= 1
            ? 'user-picker-list animate'
            : 'user-picker-list'
        }
      >
        <p className="list__header">Choose a participant</p>
        {users.map((user) => (
          <User
            firstName={user.firstName}
            lastName={user.lastName}
            url={user.url}
            pickUser={pickUser}
            key={user.id}
            id={user.id}
          />
        ))}
      </div>
    );
  }
}

export default onClickOutside(List);
