// @flow
import type { FetchResult } from 'apollo-client';
import client from 'utils/api';
import { getDealParametrs } from '../../graphql/queries';
import type { ParameterType } from '../../types';

type Response = Array<ParameterType>

// eslint-disable-next-line import/prefer-default-export
export async function fetchParametersData(): Promise<FetchResult<Response>> {
  try {
    const response = await client.query({
      query: getDealParametrs,
    });
    return response.data.dealParameters;
  } catch (err) {
    throw new Error(err.message);
  }
}
