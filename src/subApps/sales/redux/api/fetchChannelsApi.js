// @flow
import type { FetchResult } from 'apollo-client';
import client from 'utils/api';
import { getChannels } from '../../graphql/queries';
import type { ChannelType } from '../../types';

type Response = Array<ChannelType>

// eslint-disable-next-line import/prefer-default-export
export async function fetchChannelsData(): Promise<FetchResult<Response>> {
  try {
    const response = await client.query({
      query: getChannels,
    });
    return response.data.dealChannels;
  } catch (err) {
    throw new Error(err.message);
  }
}
