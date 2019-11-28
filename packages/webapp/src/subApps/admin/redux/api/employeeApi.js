// @flow

import type { FetchResult } from 'apollo-link';
import client from 'utils/api';
import {
  getEmployeeById,
  getEmployess,
  updateEmployee,
  createEmployee,
  deleteEmployee,
} from '../../graphql/queries';
import type { Employees } from '../../types';

type EmployeeType = {
  data: Employees
} | null;

export async function fetchEmployee(params: {
  id: string | number,
}): Promise<FetchResult<EmployeeType>> {
  try {
    const { id } = params;
    const response = await client.query({
      query: getEmployeeById,
      variables: {
        id,
      },
    });
    return response.data.employee;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchEmployees(variables: {
  search?: string,
  offset?: number,
  limit?: number
}): Promise<FetchResult<Array<EmployeeType>>> {
  try {
    const response = await client.query({
      query: getEmployess,
      variables,
    });
    return response.data.employees;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchUpdateEmployee(
  data: EmployeeType,
): Promise<FetchResult<EmployeeType>> {
  try {
    const response = await client.mutate({
      mutation: updateEmployee,
      variables: data,
    });
    return response.data.updateEmployee;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchCreateEmployee(
  data: EmployeeType,
): Promise<FetchResult<EmployeeType>> {
  try {
    const response = await client.mutate({
      mutation: createEmployee,
      variables: data,
    });
    return response.data.addEmployee;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchDeleteEmployee(params: {
  id: string
}): Promise<FetchResult<void>> {
  try {
    await client.mutate({
      mutation: deleteEmployee,
      variables: { id: params.id },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
