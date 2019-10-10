/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
// @flow
import React from 'react';
import debounce from 'lodash.debounce';
import { getEmployees } from '../../graphql/queries/employess.queries';

import List from './user-picker-list.component';
import UsersField from './user-picker-users-field.component';

import './user-picker.styles.scss';

type Employee = {
  id: string,
  firstName: string,
  lastName: string,
  name: string
};

type State = {
  filteredUsers: Array<Employee>,
  togglePopup: boolean,
  fetchedUsers: Array<Employee>,
  term: string,
  users: Array<Employee>,
  error: string
};

type Props = {
  users: Array<Employee>,
  title: string,
  deleteUser: (id: string) => void,
  getUsers: (users: Array<Employee>) => void
};

class UserPicker extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      togglePopup: false,
      fetchedUsers: [],
      filteredUsers: [],
      term: '',
      users: [],
      error: '',
    };
  }

  componentDidMount = async () => {
    const fetchedUsers = await getEmployees();
    this.setState({ fetchedUsers: fetchedUsers.data.employees.employees });
  };

  handleChange = (e: SyntheticInputEvent<*>) => {
    const debouncedUsers = debounce((term) => {
      const { fetchedUsers } = this.state;
      this.setState({
        filteredUsers:
          term === ''
            ? []
            : fetchedUsers.filter(
              (user) => user.firstName.toLowerCase().indexOf(term.toLowerCase())
                  !== -1,
            ),
      });
    }, 400);

    this.setState({ term: e.target.value, togglePopup: true }, () => {
      const { term } = this.state;
      debouncedUsers(term);
    });
  };

  pickUser = (userId: number) => {
    const { users } = this.props;
    const { fetchedUsers } = this.state;
    const user: Object = fetchedUsers.find(
      (userJson) => userJson.id === userId,
    );
    const existedUser = users.find((usersProp) => usersProp.id === user.id);
    if (!existedUser) {
      this.setState(
        {
          error: '', users: [user, ...users], term: '', filteredUsers: [],
        },
        () => {
          this.setState({ term: '', filteredUsers: [] }, () => {
            this.setUsers();
          });
        },
      );
    } else {
      this.setState(
        { error: `${existedUser.firstName} already exists` },
        () => {
          this.setState({ term: '', filteredUsers: [] });
        },
      );
    }
  };

  setUsers = () => {
    const { getUsers } = this.props;
    const { users } = this.state;
    getUsers(users);
  };

  getUsersById = () => {
    const { users } = this.props;
    const { fetchedUsers } = this.state;
    const userIds = users.map((user) => user.id);
    // TODO: FIX THIS
    // $FlowFixMe
    const newUsers = fetchedUsers.filter((userJson) => userIds.includes(userJson.id));
    return newUsers;
  };

  toggle = () => {
    this.setState((state) => ({ togglePopup: !state.togglePopup }));
  };

  render() {
    const { deleteUser, title } = this.props;
    const {
      error, togglePopup, filteredUsers, term,
    } = this.state;
    const newUsers = this.getUsersById();
    return (
      <div className="user-picker-root">
        <div className="user-picker" style={{ position: 'relative' }}>
          {togglePopup && (
            <List
              toggle={this.toggle}
              // TODO: FIX THIS
              // $FlowFixMe
              users={filteredUsers}
              // TODO: FIX THIS
              // $FlowFixMe
              pickUser={this.pickUser}
              eventTypes="click"
            />
          )}
          <h3 className="heading-tertiarry">{title}</h3>
          <input
            className="user-picker-input"
            onChange={this.handleChange}
            value={term}
            type="text"
          />
          <UsersField users={newUsers} deleteUser={deleteUser} />
        </div>
        <span className="user-picker-error">{error || null}</span>
      </div>
    );
  }
}

export default UserPicker;
