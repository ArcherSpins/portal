// @flow
import type { CalendarType } from '../../types';

// eslint-disable-next-line import/prefer-default-export
export const getCalendarData = (year: string, returnFunc?: (Array<CalendarType>) => void): {
  type: 'GET_CALENDAR_REQUEST',
  payload: {
    year: string,
    returnFunc?: (data: Array<CalendarType>) => void
  }
} => ({
  type: 'GET_CALENDAR_REQUEST',
  payload: {
    year,
    returnFunc,
  },
});
