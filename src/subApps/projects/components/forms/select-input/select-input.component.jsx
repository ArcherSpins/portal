/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
// TODO: FIX
// @flow
import React from 'react';

import { getEmployees } from '../../../graphql/queries/employess.queries';

import './select-input.styles.scss';

type Employees = {
  id: string,
  firstName: string,
  lastName: string
};

type State = {
  employees: Array<Employees>
};

type Props = {
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  name: string,
  value: string,
  setFirstUser?: (id: string) => void
};

class SelectInput extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      employees: [],
    };
  }

  componentDidMount = async () => {
    const employees = await getEmployees();
    this.setState(
      {
        employees: employees.data.employees.employees,
      },
      () => {
        if (this.props.setFirstUser) {
          this.props.setFirstUser(this.state.employees[0].id);
        }
      },
    );
  };

  render() {
    const { employees } = this.state;
    return (
      <div className="select-input margin-bottom-md">
        <h3 className="heading-tertiarry">Project Manager</h3>
        <select
          required
          className="manager-field"
          onChange={this.props.onChange}
          name={this.props.name}
          value={this.props.value}
        >
          {/* <option value="" disabled selected>
            Choose User...
          </option> */}
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.firstName}
              {' '}
              {e.lastName}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default SelectInput;
