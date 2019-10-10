// @flow
import type { FetchResult } from 'apollo-link';
import { client } from '../../graphql/client';
import { getSpentTimeBounds, updateSpentTime } from '../../graphql/queries';
import type { SpentTimeBoundsType } from '../../types';

type Response = SpentTimeBoundsType;

export async function fetchSpentTimeBounds(): Promise<FetchResult<Response>> {
  try {
    const response = await client.query({
      query: getSpentTimeBounds,
    });
    return response.data.getSpentTimeBounds;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchUpdateSpentTimeBounds(
  data: SpentTimeBoundsType,
): Promise<FetchResult<Response>> {
  try {
    await client.query({
      query: updateSpentTime,
      variables: data,
    });
  } catch (err) {
    throw new Error(err.message);
  }
}
