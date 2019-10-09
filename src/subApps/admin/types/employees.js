// @flow
import type { Skill } from './skill';
import type { Department } from './department';
import type { Position } from './position';

export type Employees = {
  id: string | number,
  email: string,
  name: string,
  middleName: string,
  status: boolean,
  timeZone: boolean,
  skills: Array<Skill>,
  department: Department,
  position: Position,
  phoneNumber: string,
  birthday: string,
  dateOfEmployment: string,
  workDayStart: {
    hours: string | number,
    minutes: string | number
  },
  workDayEnd: {
    hours: string | number,
    minutes: string | number
  },
  lunchStart: {
    hours: string | number,
    minutes: string | number
  },
  createdAt: string,
  updatedAt: string,
  position: {
    id: number | string,
    title: string,
    businessLoad: number,
  }
}
