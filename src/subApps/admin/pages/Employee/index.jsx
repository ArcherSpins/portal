/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
// TODO: REMOVE ESLINT SUPPRESS COMMENTS AND FIX ERRORS
// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Match, RouterHistory } from 'react-router-dom';
import {
  LeftNavbar,
  HeaderEmployee,
  EmployeeForm,
  AlertMessage,
} from '../../components';
import { LoadingContainer } from '../../containers';
import {
  getEmployeeId,
  requestAllDepartments,
  closeErrorMessage,
  getCitiesAction,
} from '../../redux/actions';
import {
  updateEmployee,
  createEmployee,
  deleteEmployee,
} from '../../redux/actions/employees';
import { getPositions } from '../../redux/actions/position';
import { PageContainer, ContainerContent } from '../styled';
import { Main } from './styled';
import type {
  Employees as EmployeesType,
  Position,
  Department,
  CityType,
} from '../../types';
import TIME_ZONE from '../../components/Forms/TIME_ZONE';

type EmployeeProps = {
  deleteEmployee: (id: string) => Array<EmployeesType>,
  match: Match,
  history: RouterHistory,
  getEmployeeId: (string) => void,
  loadingEmployeeById: boolean,
  employeeById: EmployeesType,
  updateEmployee: (data: EmployeesType) => void,
  createEmployee: (data: EmployeesType) => void,
  getPositions: (data: Position) => void,
  positions: Array<Position>,
  loadingPositions: boolean,
  requestAllDepartments: () => void,
  departments: Array<Department>,
  loadingDepartments: boolean,
  errorStatus: boolean,
  errorMessage: string,
  closeErrorMessage: () => void,
  getCitiesAction: () => void,
  cities: Array<CityType>,
  loadingCities: boolean
}

const LOUNCH_START = [
  {
    hours: 12,
    minutes: 0,
  },
  {
    hours: 13,
    minutes: 0,
  },
  {
    hours: 14,
    minutes: 0,
  },
];

const WORKING_DAY_START = [
  {
    hours: 7,
    minutes: 0,
  },
  {
    hours: 8,
    minutes: 0,
  },
  {
    hours: 9,
    minutes: 0,
  },
  {
    hours: 10,
    minutes: 0,
  },
  {
    hours: 11,
    minutes: 0,
  },
];


class EmployeeComponent extends React.PureComponent<EmployeeProps> {
  componentDidMount(): void {
    this._getCities();
    this._getEmployee();
    this._getPositions();
    this._getDepartments();
  }

  _getEmployee = () => {
    const { match, getEmployeeId } = this.props;
    // $FlowFixMe
    getEmployeeId(match.params.id || null);
  }

  _getPositions = () => {
    const { getPositions } = this.props;
    getPositions();
  }

  _getDepartments = () => {
    const { requestAllDepartments } = this.props;
    requestAllDepartments();
  }

  _getCities = () => {
    const { getCitiesAction } = this.props;
    getCitiesAction();
  }

  _getWorkingDayStart = (data?: {
    workDayStart: {
      hours: number,
      minutes: number
    }
  }): Array<{
    hours: number,
    minutes: number,
    label: string,
    active: boolean
  }> => WORKING_DAY_START.map((item) => {
    if (data && item.hours === data.workDayStart.hours
      && item.minutes === data.workDayStart.minutes) {
      return {
        ...item,
        label: `${String(item.hours).padStart(2, '0')}:${String(item.minutes).padStart(2, '0')}`,
        active: true,
      };
    }
    return {
      ...item,
      label: `${String(item.hours).padStart(2, '0')}:${String(item.minutes).padStart(2, '0')}`,
      active: false,
    };
  })

  _getLounchStart = (data?: {
    lunchStart: {
      hours: number,
      minutes: number
    }
  }): Array<{
    hours: number,
    minutes: number,
    label: string,
    active: boolean
  }> => LOUNCH_START.map((item) => {
    if (data && item.hours === data.lunchStart.hours
        && item.minutes === data.lunchStart.minutes) {
      return {
        ...item,
        label: `${String(item.hours).padStart(2, '0')}:${String(item.minutes).padStart(2, '0')}`,
        active: true,
      };
    }
    return {
      ...item,
      label: `${String(item.hours).padStart(2, '0')}:${String(item.minutes).padStart(2, '0')}`,
      active: false,
    };
  })

  deleteEmployee = (): void => {
    const {
      deleteEmployee, match,
    } = this.props;
    if (match.params.id) {
      deleteEmployee(String(match.params.id));
    }
  };

  // TODO: FIX THIS AND REFACTOR
  // $FlowFixMe
  submitEmployeeForm = (data) => {
    const {
      updateEmployee, match, createEmployee, cities,
    } = this.props;
    if (match.params.id) {
      updateEmployee({
        ...data,
        id: match.params.id,
        city: String(data.city ? data.city.id : cities[0].id),
        positionId: data.position ? data.position.id : null,
        timeZone: data.timeZone ? data.timeZone.label : null,
        workDayStart: data.workDayStart ? [
          data.workDayStart.label.split(':')[0].trim(),
          data.workDayStart.label.split(':')[1].trim(),
        ] : null,
        lunchStart: data.lunchStart ? [
          data.lunchStart.label.split(':')[0].trim(),
          data.lunchStart.label.split(':')[1].trim(),
        ] : null,
      });
    } else if (match.params.new_employee) {
      createEmployee({
        ...data,
        city: String(data.city ? data.city.id : cities[0].id),
        positionId: data.position ? data.position.id : null,
        timeZone: data.timeZone ? data.timeZone.label : TIME_ZONE[0].label,
        workDayStart: data.workDayStart ? [
          data.workDayStart.label.split(':')[0].trim(),
          data.workDayStart.label.split(':')[1].trim(),
        ] : null,
        lunchStart: data.lunchStart ? [
          data.lunchStart.label.split(':')[0].trim(),
          data.lunchStart.label.split(':')[1].trim(),
        ] : null,
      });
    }
  }

  render() {
    const {
      history,
      loadingEmployeeById,
      employeeById,
      match,
      positions,
      loadingPositions,
      departments,
      loadingDepartments,
      errorStatus,
      errorMessage,
      closeErrorMessage,
      cities,
      loadingCities,
    } = this.props;

    return (
      <PageContainer style={{ display: 'flex' }}>
        <LeftNavbar />
        <ContainerContent
          style={{
            marginLeft: `${220}px`,
            paddingLeft: 30,
          }}
        >
          {
            errorStatus && (
              <AlertMessage
                error
                message={errorMessage}
                closeModal={closeErrorMessage}
              />
            )
          }
          {
            loadingEmployeeById || loadingPositions || loadingDepartments || loadingCities ? (
              <LoadingContainer />
            ) : (
              <div>
                <HeaderEmployee
                  title={
                    match.params.new_employee === 'new_employee' ? 'New Employee'
                      : employeeById && employeeById.name
                  }
                  deleteEmployee={match.params.new_employee !== 'new_employee' && this.deleteEmployee}
                  goBack={history.goBack}
                />
                <Main>
                  <EmployeeForm
                    showEditForm={match.params.new_employee === 'new_employee'}
                    defaultData={match.params.new_employee === 'new_employee' ? {
                      positions,
                      departments: departments || [],
                      cities,
                      city: cities[0],
                      workDayStart: this._getWorkingDayStart(),
                      lunchStart: this._getLounchStart(),
                      new_employee: true,
                    } : {
                      ...employeeById,
                      positions,
                      departments: departments || [],
                      cities,
                      lunchStart: this._getLounchStart(employeeById),
                      workDayStart: this._getWorkingDayStart(employeeById),
                    }}
                    submit={this.submitEmployeeForm}
                  />
                </Main>
              </div>
            )
          }
        </ContainerContent>
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  employeeById: state.employees.employeeById,
  loadingEmployeeById: state.employees.loadingEmployeeById,
  loadingPositions: state.position.loading,
  positions: state.position.positions,
  departments: state.departments.departments,
  loadingDepartments: state.departments.loading,
  errorStatus: state.app.errorStatus,
  errorMessage: state.app.errorMessage,
  cities: state.city.cities,
  loadingCities: state.city.loading,
});

const mapDispatchToProps = {
  getEmployeeId,
  updateEmployee,
  createEmployee,
  deleteEmployee,
  getPositions,
  requestAllDepartments,
  closeErrorMessage,
  getCitiesAction,
};

const Employee = compose(
  // $FlowFixMe
  connect(mapStateToProps, mapDispatchToProps),
)(EmployeeComponent);

// eslint-disable-next-line import/prefer-default-export
export { Employee };
