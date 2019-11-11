// @flow
import type { CalendarType } from '../../types';

// eslint-disable-next-line import/prefer-default-export
export const getCalendarData = (year: CalendarType): {
  type: 'GET_CALENDAR_REQUEST',
  payload: string
} => ({
  type: 'GET_CALENDAR_REQUEST',
  payload: year,
});
