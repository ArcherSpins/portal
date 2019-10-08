// @flow
import client from 'utils/api';
import { getSelfInfo } from '../../graphql/queries';
// import type { ManagerType } from '../../types';

// eslint-disable-next-line import/prefer-default-export
export async function fetchFetchInfo(): Promise<void> {
  try {
    client.query({
      query: getSelfInfo,
    });
    // return response.data.employees.employees;
  } catch (err) {
    throw new Error(err.message);
  }
}
