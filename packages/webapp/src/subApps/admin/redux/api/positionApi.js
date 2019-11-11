/* eslint-disable import/prefer-default-export */
// @flow
import type { FetchResult } from 'apollo-link';
import { client } from '../../graphql/client';
import {
  getPositions,
} from '../../graphql/queries';
import type { Position } from '../../types';

type Response = {
  positions: Array<Position>
}

export async function fetchPositions(): Promise<FetchResult<Response>> {
  try {
    const response = await client.query({
      query: getPositions,
    });

    return response.data.positions;
  } catch (err) {
    throw new Error(err.message);
  }
}
