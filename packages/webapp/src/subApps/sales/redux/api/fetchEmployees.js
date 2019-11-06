// @flow
import type { FetchResult } from 'apollo-client';
import client from 'utils/api';
import { getEmployees } from '../../graphql/queries';
import type { EmployeeType } from '../../types';

type Response = Array<EmployeeType>

// eslint-disable-next-line import/prefer-default-export
export async function fetchEmployees(data: { search?: string }): Promise<FetchResult<Response>> {
  try {
    const response = await client.query({
      query: getEmployees,
      variables: {
        search: data.search,
      },
    });
    return response.data.employees.employees;
  } catch (err) {
    throw new Error(err.message);
  }
}
