// @flow
import type { ErrorMessageType, SearchEmployeesAction } from './types';

export const closeErrorMessage = (): ErrorMessageType => ({
  type: 'CLOSE_ERROR_MESSAGE',
});

export const searchEmployees = (search: string): SearchEmployeesAction => ({
  type: 'ON_CHANGE_SEARCH_EMPLOYEES',
  payload: search,
});
