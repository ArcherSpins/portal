// @flow
import type { FetchResult } from 'apollo-link';
import client from 'utils/api';
import { queryCalendar } from '../../graphql/queries';
import type { CalendarType } from '../../types';

type Response = Array<CalendarType>

// eslint-disable-next-line import/prefer-default-export
export async function fetchCalendarData(data: { year: string }): Promise<FetchResult<Response>> {
  try {
    const response = await client.query({
      query: queryCalendar,
      variables: data,
    });
    return response.data.calendar;
  } catch (err) {
    throw new Error(err.message);
  }
}
