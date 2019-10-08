// @flow
import type { FetchResult } from 'apollo-client';
import client from 'utils/api';
import { getSources } from '../../graphql/queries';
import type { SourceType } from '../../types';

type Response = Array<SourceType>

// eslint-disable-next-line import/prefer-default-export
export async function fetchSourcesData(): Promise<FetchResult<Response>> {
  try {
    const response = await client.query({
      query: getSources,
    });
    return response.data.dealSources;
  } catch (err) {
    throw new Error(err.message);
  }
}
