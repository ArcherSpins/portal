// @flow
import type { FetchResult } from 'apollo-link';
import { client } from '../../graphql/client';
import { getCities } from '../../graphql/queries';
import type { CityType } from '../../types';

type Response = Array<CityType>

// eslint-disable-next-line import/prefer-default-export
export async function fetchCitiesData(): Promise<FetchResult<Response>> {
  try {
    const response = await client.query({
      query: getCities,
    });
    return response.data.cities;
  } catch (err) {
    throw new Error(err.message);
  }
}
