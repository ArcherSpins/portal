// @flow
import type { FetchResult } from 'apollo-link';
import client from 'utils/api';
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
    // TODO: fix this
    await client.mutate({
      mutation: updateSpentTime,
      variables: {
        ...data,
        weeks: '0',
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
}
