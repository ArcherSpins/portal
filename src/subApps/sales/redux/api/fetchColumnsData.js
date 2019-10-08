// @flow
import type { FetchResult } from 'apollo-client';
import client from 'utils/api';
import { getColumns } from '../../graphql/queries';
import type { EmployeeType } from '../../types';

type Response = Array<EmployeeType>

// eslint-disable-next-line import/prefer-default-export
export async function fetchColumnsData(): Promise<FetchResult<Response>> {
  try {
    const response = await client.query({
      query: getColumns,
    });
    return response.data.columnsData[0].stages;
  } catch (err) {
    throw new Error(err.message);
  }
}
