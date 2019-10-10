// @flow
import type { Position } from '../../types';
import type { PositionType } from '../actions/types';

type State = {
  positions: Array<Position>,
  loading: boolean
}

const initialState: State = {
  positions: [],
  loading: false,
};

export default (state: State = initialState, action: PositionType): State => {
  switch (action.type) {
    case 'GET_POSITIONS_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'GET_POSITIONS_SUCCESS':
      return {
        ...state,
        loading: false,
        positions: action.payload,
      };
    case 'GET_POSITIONS_FAIL':
      return {
        ...state,
        loading: false,
        positions: [],
      };
    default: return state;
  }
};
