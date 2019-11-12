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
import { format } from 'date-fns';
import {
  Dropdown, Combobox, Input, Datepicker, Toast, Button,
} from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { getCities } from '../../graphql/queries';
import type { Employee, CityType } from '../../types';
import {
  AuthForm,
  FieldBlock,
  SubmitButton,
} from './styled';
import './style.scss';
import TIME_ZONE from './TIME_ZONE';

const createTestAttr = createTestContext('employee-form');

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

type FormData = {
  birthday: string,
  dateOfEmployment: string,
  [string]: any
}

type EmployeeFormState = {
  formData: FormData,
  errorBoundry: {
    city: boolean,
    firstName: boolean,
    email: boolean,
    position: boolean,
    lastName: boolean,
    middleName: boolean,
    phoneNumber: boolean,
    birthday: boolean,
    dateOfEmployment: boolean
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
        birthday: false,
        dateOfEmployment: false,
      },
      formData: {
        department: true,
        birthday: '',
        dateOfEmployment: '',
      },
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
        position: this.getPosition(defaultData).find((item) => item.active),
        dateOfEmployment: defaultData.dateOfEmployment ? new Date(defaultData.dateOfEmployment) : '',
        birthday: defaultData.birthday ? new Date(defaultData.birthday) : '',
      },
    });
  }

  onChange = (idx: number | string, value: mixed): void => {
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

  validateForm = (data: FormData): boolean => {
    let status = true;
    const { errorBoundry } = this.state;
    const arrayValidate = [
      'firstName',
      'lastName',
      'email',
      'position',
      'phoneNumber',
      'middleName',
      'dateOfEmployment',
    ];
    const errors = { ...errorBoundry };
    for (let i = 0; i < arrayValidate.length; i += 1) {
      if (!data[arrayValidate[i]]) {
        status = false;
        errors[arrayValidate[i]] = true;
        Toast.push({ message: 'Fill in all the fields!', type: 'danger' });
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
        value: item.title,
        active: true,
      };
    }
    return {
      ...item,
      label: item.title,
      value: item.title,
    };
  })

  getPosition = (defaultData: { ...Employee, cities: Array<CityType> }) => [
    { title: 'Not selected', id: null, value: 'Not selected' },
    ...defaultData.positions,
  ].map((item) => {
    if (defaultData.position && defaultData.position.id === item.id) {
      return {
        ...item,
        label: item.title,
        value: item.title,
        active: true,
      };
    }

    return {
      ...item,
      label: item.title,
      value: item.title,
    };
  })

  searchCity = async (inputValue: string) => {
    const { fetchSearchCities } = this.props;
    // $FlowFixMe
    const response = await fetchSearchCities.refetch({
      search: inputValue,
    });
    return response.data.cities.map((item) => {
      if (item) {
        return {
          ...item,
          label: String(`${item.name}, ${item.country}`),
          value: String(`${item.name}, ${item.country}`),
        };
      }
      return item;
    });
  }

  getCity = (
    defaultData: { ...Employee, cities: Array<CityType> },
  ) => {
    // @FlowFixMe
    if (defaultData.cities && defaultData.cities.length > 0) {
      return defaultData.cities.map((item) => {
        if (defaultData.city && defaultData.city.id === item.id) {
          return {
            ...item,
            label: String(`${item.name}, ${item.country}`),
            value: String(`${item.name}, ${item.country}`),
            active: true,
          };
        }
        return {
          ...item,
          label: String(`${item.name}, ${item.country}`),
          value: String(`${item.name}, ${item.country}`),
        };
      });
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

  onDateChange = (selectedDay: Date, name: string) => {
    const { formData } = this.state;
    if (name) {
      this.setState({
        formData: {
          ...formData,
          [name]: selectedDay,
        },
      });
    } else {
      throw new Error('input should have a name property');
    }
  }

  render() {
    const { showEdit, errorBoundry, formData } = this.state;
    const { defaultData } = this.props;
    const departments = this.getDepartment(defaultData);
    const positions = this.getPosition(defaultData);
    const cities = this.getCity(defaultData);
    const timeZones = this.getTimeZone();
    if (!defaultData) {
      return null;
    }
    return (
      <AuthForm
        className="employee-form"
        onSubmit={this.submitForm}
        style={{ maxWidth: 600 }}
      >
        <FieldBlock className="flex-block dropdown-field-block padding-right-1">
          <Input
            className="block"
            label="Name"
            value={formData.firstName}
            placeholder="Your firstname"
            error={errorBoundry.firstName}
            use="borderless"
            onChange={(e: SyntheticEvent<HTMLInputElement>) => {
              // $FlowFixMe
              this.onChange('firstName', e.target.value);
              this.toggleEdit(true);
            }}
            data-test={createTestAttr('firstname-input')}
          />
          <Input
            className="block"
            label="Login"
            value={formData.email}
            placeholder="Your lastname"
            error={errorBoundry.email}
            use="borderless"
            onChange={(e: SyntheticEvent<HTMLInputElement>) => {
              // $FlowFixMe
              this.onChange('email', e.target.value);
              this.toggleEdit(true);
            }}
            type="email"
            data-test={createTestAttr('lastname-input')}
          />
        </FieldBlock>

        <FieldBlock>
          <Input
            className="pr-1 col-6"
            label="Surname"
            value={formData.lastName}
            placeholder="Your surname"
            error={errorBoundry.lastName}
            use="borderless"
            onChange={(e: SyntheticEvent<HTMLInputElement>) => {
              // $FlowFixMe
              this.onChange('lastName', e.target.value);
              this.toggleEdit(true);
            }}
            data-test={createTestAttr('surname-input')}
          />
        </FieldBlock>

        <FieldBlock className="flex-block dropdown-field-block padding-right-1">
          <Input
            label="Middle name"
            className="block"
            placeholder="Middle name"
            value={formData.middleName}
            error={errorBoundry.middleName}
            use="borderless"
            onChange={(e: SyntheticEvent<HTMLInputElement>) => {
              // $FlowFixMe
              this.onChange('middleName', e.target.value);
              this.toggleEdit(true);
            }}
            data-test={createTestAttr('middlename-input')}
          />
          <Datepicker
            label="Date of birth"
            className="form-datepicker pr-1 col-6"
            value={formData.birthday}
            name="birthday"
            error={errorBoundry.birthday}
            onDayChange={(value) => {
              this.onChange('birthday', value);
              this.toggleEdit(true);
            }}
            data-test={createTestAttr('birthdate-input')}
          />
        </FieldBlock>

        <FieldBlock className="flex-block dropdown-field-block">
          <Dropdown
            className="block col-6"
            use="borderless"
            options={departments}
            onChange={(value) => {
              this.onChange('department', value);
              this.toggleEdit(true);
            }}
            value={
              formData.department
                || (departments.length > 0 ? departments.find((item) => item.active) || departments[0] : '')
            }
            idx="department"
            label="Department"
            dataTest={createTestAttr('department-select')}
          />
          <Dropdown
            className="block col-6"
            use="borderless"
            options={positions}
            onChange={(value) => {
              this.onChange('position', value);
              this.toggleEdit(true);
            }}
            error={errorBoundry.position}
            value={
              formData.position
                || (positions.length > 0 ? positions.find((item) => item.active) || positions[0] : '')
            }
            idx="position"
            label="Position"
            dataTest={createTestAttr('positions-select')}
          />
        </FieldBlock>

        <FieldBlock>
          <Input
            className="pr-1 col-6"
            mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
            value={formData.phoneNumber}
            placeholder="Your phone number"
            label="Phone number"
            use="borderless"
            name="phoneNumber"
            error={errorBoundry.phoneNumber}
            onChange={(e) => {
              this.onChange('phoneNumber', e.target.value);
              this.toggleEdit(true);
            }}
            data-test={createTestAttr('phone-input')}
          />
        </FieldBlock>

        <FieldBlock className="flex-block dropdown-field-block">
          <Combobox
            className="block col-6"
            use="borderless"
            loadOptions={this.searchCity}
            onChange={(value) => {
              this.onChange('city', value);
              this.toggleEdit(true);
            }}
            selectedOption={
              // eslint-disable-next-line no-nested-ternary
              formData.city
                ? {
                  ...formData.city,
                  label: String(`${formData.city.name}, ${formData.city.country}`),
                  value: String(`${formData.city.name}, ${formData.city.country}`),
                } : (cities.length > 0 ? cities.find((item) => item.active) || cities[0] : null)
            }
            label="City"
            error={errorBoundry.city}
            dataTest={createTestAttr('city-select')}
          />
          <Dropdown
            className="block col-6"
            use="borderless"
            options={timeZones}
            onChange={(value) => {
              this.onChange('timeZone', value);
              this.toggleEdit(true);
            }}
            value={
              formData.timeZone
                || (timeZones.length > 0 ? timeZones.find((item) => item.active) || timeZones[0] : '')
            }
            label="Time zone"
            dataTest={createTestAttr('timezone-select')}
          />
        </FieldBlock>

        <FieldBlock>
          <Datepicker
            label="Date of employment"
            className="form-datepicker pr-1 col-6"
            error={errorBoundry.dateOfEmployment}
            value={formData.dateOfEmployment}
            onDayChange={(value) => {
              this.onChange('dateOfEmployment', value);
              this.toggleEdit(true);
            }}
            data-test={createTestAttr('employment-date-input')}
          />
        </FieldBlock>

        <FieldBlock className="flex-block dropdown-field-block">
          <Dropdown
            className="block col-6"
            use="borderless"
            options={defaultData.workDayStart}
            onChange={(value) => {
              this.onChange('workDayStart', value);
              this.toggleEdit(true);
            }}
            value={
              formData.workDayStart
                || (defaultData.workDayStart.length > 0
                  ? defaultData.workDayStart.find((item) => item.active)
                  || defaultData.workDayStart[0] : '')
            }
            label="Working day starts at"
            dataTest={createTestAttr('working-hour-select')}
          />
          <p className="block col-6 pl-2">
            {`Working day ends at ${(defaultData.workDayEnd && String(defaultData.workDayEnd.hours).padStart(2, '0')) || 18}
          :${(defaultData.workDayEnd && String(defaultData.workDayEnd.minutes || 0).padStart(2, '0')) || '00'}`}
          </p>
        </FieldBlock>

        <FieldBlock className="flex-block dropdown-field-block col-6">
          <Dropdown
            className="block"
            use="borderless"
            options={defaultData.lunchStart}
            onChange={(value) => {
              this.onChange('lunchStart', value);
              this.toggleEdit(true);
            }}
            value={
              formData.lunchStart
                || (defaultData.lunchStart.length > 0
                  ? defaultData.lunchStart.find((item) => item.active)
                  || defaultData.lunchStart[0] : '')
            }
            label="Lunch starts at"
            dataTest={createTestAttr('lunch-hour-select')}
          />
        </FieldBlock>

        {
          showEdit && (
            <Button
              type="submit"
              data-test={createTestAttr('save-button')}
            >
              Save
            </Button>
          )
        }
      </AuthForm>
    );
  }
}

export default compose(
  graphql(getCities, { name: 'fetchSearchCities' }),
)(EmployeeForm);
