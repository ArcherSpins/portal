// @flow
import type {
  Employees,
} from './employees';

export type Position = {
  id: string | number,
  title: string,
  businessLoad: number,
  employees: Array<Employees>,
  countEmployees: number
}
