// @flow
import type { Position } from './position';
import type { Employees } from './employees';

export type Department = {
  id: string | number,
  title: string,
  positions: Array<Position>,
  manager: Employees,
  managingDepartment: Department,
  employees: Array<Employees>,
  countEmployees: number,
  department: Employees,
  phoneNumber: string | number,
  birthday: string,
  dateOfEmployment: string,
  workDayEnd: {
    hours: number | string,
    minutes: number | string
  },
  workDayStart: {
    hours: number | string,
    minutes: number | string
  },
  lunchStart: {
    hours: number | string,
    minutes: number | string
  },
  createdAt: string,
  updatedAt: string
}
