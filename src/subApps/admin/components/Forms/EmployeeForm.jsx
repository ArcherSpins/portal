/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
// TODO: FIX THIS!!
/* eslint-disable camelcase */
// @flow
// $FlowFixMe
import React from 'react';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
import {
  InputToggle,
  PickerToggle,
  SelectToggle,
} from '..';
import { getCities } from '../../graphql/queries';
import type { Employee, CityType } from '../../types';
import {
  AuthForm,
  FieldBlock,
  SubmitButton,
} from './styled';
import './style.scss';
import TIME_ZONE from './TIME_ZONE';

type EmployeeFormProps = {
  submit: ({
    [string]: mixed
  }) => void,
  defaultData: { ...Employee, cities: Array<CityType> },
  showEditForm: boolean,
  fetchSearchCities: {
    refetch: ({
      search: string | null
    }) => Array<CityType>
  },
  new_employee: boolean
}

type EmployeeFormState = {
  formData: {
    [string]: mixed
  },
  errorBoundry: {
    city: boolean,
    firstName: boolean,
    email: boolean,
    position: boolean,
    lastName: boolean,
    middleName: boolean,
    phoneNumber: boolean
  },
  showEdit: boolean
}


class EmployeeForm extends React.Component<
  EmployeeFormProps, EmployeeFormState
> {
  constructor(props: EmployeeFormProps) {
    super(props);

    const { showEditForm } = this.props;
    const show = showEditForm !== null && showEditForm !== undefined ? showEditForm : false;

    this.state = {
      showEdit: show,
      errorBoundry: {
        city: false,
        firstName: false,
        email: false,
        position: false,
        lastName: false,
        middleName: false,
        phoneNumber: false,
      },
      formData: {},
    };
  }

  componentDidMount() {
    const { new_employee, defaultData } = this.props;
    const { errorBoundry } = this.state;
    const data = {};
    if (!new_employee) {
      for (const i in errorBoundry) {
        data[i] = defaultData[i];
      }
    }
    this.setState({
      formData: {
        ...data,
        position: this.getPosition(defaultData),
      },
    });
  }

  onChange = (idx: number | string, value: string | { id: mixed, [string]: mixed }): void => {
    const { formData, errorBoundry } = this.state;
    this.setState({
      formData: {
        ...formData,
        [idx]: value,
      },
      errorBoundry: {
        ...errorBoundry,
        // $FlowFixMe
        [idx]: value === '' || value.id === null,
      },
    });
  }

  toggleEdit = (status: boolean): void => {
    this.setState({
      showEdit: status,
    });
  }

  validateForm = (data: { [string]: mixed }): boolean => {
    let status = true;
    const { errorBoundry } = this.state;
    const arrayValidate = [
      'firstName',
      'lastName',
      'email',
      'position',
      'phoneNumber',
      'middleName',
    ];
    const errors = { ...errorBoundry };
    for (let i = 0; i < arrayValidate.length; i += 1) {
      if (!data[arrayValidate[i]]) {
        status = false;
        errors[arrayValidate[i]] = true;
      } else {
        errors[arrayValidate[i]] = false;
      }
    }
    this.setState({ errorBoundry: errors });
    return status;
  }

  submitForm = (e: SyntheticEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const { submit } = this.props;
    const { formData } = this.state;
    if (this.validateForm(formData)) {
      submit({
        ...formData,
      });
      this.setState({ showEdit: false });
    }
  }

  getDepartment = (defaultData: { ...Employee, cities: Array<CityType> }) => [
    {
      id: null,
      title: 'Not selected',
    },
    ...defaultData.departments,
  ].map((item) => {
    if (defaultData.department && defaultData.department.id === item.id) {
      return {
        ...item,
        label: item.title,
        active: true,
      };
    }
    return {
      ...item,
      label: item.title,
    };
  })

  getPosition = (defaultData: { ...Employee, cities: Array<CityType> }) => [
    { title: 'Not selected', id: null },
    ...defaultData.positions,
  ].map((item) => {
    if (defaultData.position && defaultData.position.id === item.id) {
      return {
        ...item,
        label: item.title,
        active: true,
      };
    }

    return {
      ...item,
      label: item.title,
    };
  })

  searchCity = async (
    defaultData: { ...Employee, cities: Array<CityType> },
    inputValue: string | null,
    callback: (Array<CityType>) => void | null,
  ) => {
    const { fetchSearchCities } = this.props;
    // $FlowFixMe
    const response = await fetchSearchCities.refetch({
      search: inputValue,
    });
    callback(response.data.cities.map((item) => {
      if (item) {
        return {
          ...item,
          label: String(`${item.name}, ${item.country}`),
          value: String(`${item.name}, ${item.country}`),
        };
      }
      return item;
    }));
  }

  getCity = (
    defaultData: { ...Employee, cities: Array<CityType> },
  ) => {
    // @FlowFixMe
    if (defaultData.cities && defaultData.cities.length > 0) {
      return defaultData.cities.map((item) => ({
        ...item,
        label: String(`${item.name}, ${item.country}`),
        value: String(`${item.name}, ${item.country}`),
      }));
    }

    return [];
  }

  getTimeZone = () => {
    const { defaultData } = this.props;
    const arr = TIME_ZONE.map((item) => {
      if ((Number(item.value.replace(/(.*)\+/, '')) === Number(defaultData.timeZone
        ? defaultData.timeZone.offset.replace(/(.*)\+/, '') : 1) / 360)
      || (Number(item.value.replace(/(.*)-/, '')) === Number(defaultData.timeZone
        ? defaultData.timeZone.offset.replace(/(.*)-/, '') : 1) / 360)) {
        return {
          ...item,
          active: true,
        };
      }
      return item;
    });
    return arr;
  }

  render() {
    const { showEdit, errorBoundry } = this.state;
    const { defaultData } = this.props;

    if (!defaultData) {
      return null;
    }

    return (
      <AuthForm
        className="employee-form"
        onSubmit={this.submitForm}
        style={{ maxWidth: 600 }}
      >
        <FieldBlock className="flex-block">
          <InputToggle
            showInput={showEdit}
            title={defaultData.firstName}
            label="Name"
            idx="firstName"
            error={errorBoundry.firstName}
            onChange={this.onChange}
            toggleEdit={this.toggleEdit}
          />
          <InputToggle
            showInput={showEdit}
            title={defaultData.email}
            error={errorBoundry.email}
            label="Login"
            type="email"
            idx="email"
            onChange={this.onChange}
            toggleEdit={this.toggleEdit}
          />
        </FieldBlock>

        <FieldBlock>
          <InputToggle
            showInput={showEdit}
            title={defaultData.lastName}
            error={errorBoundry.lastName}
            label="Surname"
            idx="lastName"
            onChange={this.onChange}
            toggleEdit={this.toggleEdit}
          />
        </FieldBlock>

        <FieldBlock className="flex-block">
          <InputToggle
            showInput={showEdit}
            title={defaultData.middleName}
            label="Middle name"
            idx="middleName"
            error={errorBoundry.middleName}
            onChange={this.onChange}
            toggleEdit={this.toggleEdit}
          />
          <PickerToggle
            onChange={this.onChange}
            showInput={showEdit}
            date={new Date(defaultData.birthday || null)}
            label="Date of birth"
            idx="birthday"
            toggleEdit={this.toggleEdit}
          />
        </FieldBlock>

        <FieldBlock className="flex-block">
          <SelectToggle
            options={this.getDepartment(defaultData)}
            onChange={this.onChange}
            idx="department"
            label="Department"
            toggleEdit={this.toggleEdit}
          />
          <SelectToggle
            options={this.getPosition(defaultData)}
            onChange={this.onChange}
            error={errorBoundry.position}
            idx="position"
            label="Position"
            toggleEdit={this.toggleEdit}
          />
        </FieldBlock>

        <FieldBlock>
          <InputToggle
            showInput={showEdit}
            title={defaultData.phoneNumber}
            label="Phone number"
            idx="phoneNumber"
            error={errorBoundry.phoneNumber}
            defaultValue="Not number"
            onChange={this.onChange}
            toggleEdit={this.toggleEdit}
          />
        </FieldBlock>

        <FieldBlock className="flex-block">
          <SelectToggle
            // $FlowFixMe
            loadOptions={
              (inputValue, callback) => this.searchCity(defaultData, inputValue, callback)
            }
            // $FlowFixMe
            defaultOptions={this.getCity(defaultData)}
            options={this.getCity(defaultData)}
            isSearch
            value={{
              label: defaultData.city ? defaultData.city.name : null,
              value: defaultData.city ? defaultData.city.name : null,
            }}
            onChange={(name, obj) => {
              // TODO: FIX THIS
              // $FlowFixMe
              this.onChange(name, obj);
              this.toggleEdit(true);
            }}
            idx="city"
            label="City"
            onBlur={() => {}}
            placeholder="Enter or select city"
            async
            toggleEdit={this.toggleEdit}
          />
          <SelectToggle
            options={this.getTimeZone()}
            onChange={this.onChange}
            idx="timeZone"
            label="Time zone"
            toggleEdit={this.toggleEdit}
          />
        </FieldBlock>

        <FieldBlock>
          <PickerToggle
            onChange={this.onChange}
            showInput={showEdit}
            date={new Date(defaultData.dateOfEmployment || null)}
            label="Date of employment"
            idx="dateOfEmployment"
            toggleEdit={this.toggleEdit}
          />
        </FieldBlock>

        <FieldBlock className="flex-block">
          <SelectToggle
            options={defaultData.workDayStart}
            onChange={this.onChange}
            idx="workDayStart"
            label="Working day starts at"
            toggleEdit={this.toggleEdit}
          />
          <InputToggle
            showInput={false}
            title={`Working day ends at ${(defaultData.workDayEnd && String(defaultData.workDayEnd.hours).padStart(2, '0')) || 18}
            :${(defaultData.workDayEnd && String(defaultData.workDayEnd.minutes || 0).padStart(2, '0')) || '00'}`}
            label=""
            idx="working_day_starts_at_string"
            onChange={this.onChange}
            toggleEdit={() => {}}
          />
        </FieldBlock>

        <FieldBlock>
          <SelectToggle
            options={defaultData.lunchStart}
            onChange={this.onChange}
            idx="lunchStart"
            label="Lunch starts at"
            toggleEdit={this.toggleEdit}
          />
        </FieldBlock>

        {
          showEdit && (
            <SubmitButton
              type="submit"
              bgColor="#219653"
            >
              Save
            </SubmitButton>
          )
        }
      </AuthForm>
    );
  }
}

export default compose(
  graphql(getCities, { name: 'fetchSearchCities' }),
)(EmployeeForm);
