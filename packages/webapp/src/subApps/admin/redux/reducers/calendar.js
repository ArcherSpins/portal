// @flow
import type { CalendarType } from '../../types';
import type { CalendarActionType } from '../actions/types';

type State = {
  calendar: Array<CalendarType>,
  loading: boolean
}

const initialState: State = {
  calendar: [],
  loading: true,
};

export default (state: State = initialState, action: CalendarActionType): State => {
  switch (action.type) {
    case 'GET_CALENDAR_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'GET_CALENDAR_SUCCESS':
      return {
        ...state,
        loading: false,
        calendar: action.payload,
      };
    case 'GET_CALENDAR_FAIL':
      return {
        ...state,
        loading: false,
      };
    default: return state;
  }
};
