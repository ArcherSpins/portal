/* eslint-disable import/no-cycle */
// TODO: FIX THIS
// @flow
import React from 'react';

import List from './UserPickerList';
import UsersField from './UserPickerUsersField';

import './userPicker.scss';

export type User = {
  id: string,
  name: string,
  url?: string
};

type Props = {
  usersJson: Array<User>,
  users: Array<User>,
  getUsers: (Array<User>) => void,
  deleteUser: () => void,
  title: string,
  defaultImage: string,
  selected: User
}

type State = {
  term: string,
  filteredUsers: Array<User>,
  users: Array<User>,
}

class UserPicker extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      term: '',
      users: [],
    };
  }

  componentDidMount() {
    const { selected } = this.props;
    this.setState({ users: [selected] });
  }

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { usersJson } = this.props;
    this.setState({
      term: e.target.value,
      filteredUsers:
        e.target.value === ''
          ? []
          : usersJson.filter((user) => user.name.toLowerCase()
            .indexOf(e.target.value.toLowerCase()) !== -1),
    });
  };

  pickUser = (userId: string) => {
    const { usersJson } = this.props;
    const user = usersJson.find((_user) => _user.id === userId);
    const userArray = [user];
    this.setState(
      // $FlowFixMe
      { users: userArray },
      () => {
        this.setState({ term: '', filteredUsers: [] }, () => {
          this.setUsers();
        });
      },
    );
  };

  setUsers = () => {
    const { getUsers } = this.props;
    const { users } = this.state;
    getUsers(users);
  };

  render() {
    const {
      deleteUser, title, users, defaultImage,
    } = this.props;
    const {
      filteredUsers, term,
    } = this.state;

    return (
      <div className="user-picker">
        <List
          defaultImage={defaultImage}
          users={filteredUsers}
          pickUser={this.pickUser}
          search={term.trim() !== ''}
        />
        <h3 className="heading-tertiarry">{title}</h3>
        <input
          className="user-picker-input"
          onChange={this.handleChange}
          value={term}
          type="text"
        />
        <UsersField users={users} deleteUser={deleteUser} />
      </div>
    );
  }
}

export default UserPicker;

// const usersJson = [
//   {
//     id: 1,
//     name: "Jhon",
//     url:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=a72ca28288878f8404a795f39642a46f"
//   },
//   {
//     id: 2,
//     name: "Hanna",
//     url:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
//   },
//   {
//     id: 3,
//     name: "Lusy",
//     url:
//       "https://tinyfac.es/data/avatars/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
//   },
//   {
//     id: 4,
//     name: "Mary",
//     url:
//       "https://tinyfac.es/data/avatars/26CFEFB3-21C8-49FC-8C19-8E6A62B6D2E0-200w.jpeg"
//   },
//   {
//     id: 5,
//     name: "Anna",
//     url: "https://randomuser.me/api/portraits/women/65.jpg"
//   }
// ];
