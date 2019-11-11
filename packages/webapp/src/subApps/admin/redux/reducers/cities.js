// @flow
import type { CityType } from '../../types';
import type { CitiesTypeAction } from '../actions/types';

type State = {
  cities: Array<CityType>,
  loading: boolean
}

const initialState: State = {
  cities: [],
  loading: false,
};

export default (state: State = initialState, action: CitiesTypeAction): State => {
  switch (action.type) {
    case 'GET_ALL_CITIES_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'GET_ALL_CITIES_SUCCESS':
      return {
        ...state,
        cities: action.payload,
        loading: false,
      };
    case 'GET_ALL_CITIES_FAIL':
      return {
        ...state,
        cities: [],
        loading: false,
      };
    default: return state;
  }
};
