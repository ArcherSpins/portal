// @flow
import type { getEmployeesPayloadType } from './types';
import type { ManagerType } from '../../types';

// eslint-disable-next-line import/prefer-default-export
export const getEmployeesAction = (
  data: getEmployeesPayloadType,
  returnEmployees: (data: Array<ManagerType>) => void,
) => ({
  type: 'GET_EMPLOYEES_REQUEST',
  payload: {
    data,
    returnEmployees,
  },
});
