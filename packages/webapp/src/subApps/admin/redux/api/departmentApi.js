// @flow
import type { FetchResult } from 'apollo-link';
import client from 'utils/api';
import { getDepartments } from '../../graphql/queries';
import type { Department } from '../../types';

type Response = Array<Department>

// eslint-disable-next-line import/prefer-default-export
export async function fetchAllDepartments(): Promise<FetchResult<Response>> {
  try {
    const response = await client.query({
      query: getDepartments,
    });

    return response.data.departments;
  } catch (err) {
    throw new Error(err.message);
  }
}
