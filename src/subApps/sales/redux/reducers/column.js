// @flow
import type { getColumnsType } from '../actions/types';
import initial from './initialStateCrm';

const initialState = {
  ...initial,
  loadingColumns: false,
  columnsData: [],
  statuses: [],
};

export default (state: mixed = initialState, action: getColumnsType): mixed => {
  switch (action.type) {
    case 'GET_COLUMNS_DATA_REQUEST':
      return {
        ...state,
        loadingColumns: true,
      };
    case 'GET_COLUMNS_DATA_SUCCESS':
      return {
        ...state,
        loadingColumns: false,
        columns: action.payload.columns,
        columnOrder: action.payload.columnOrder,
        columnsData: action.payload.columnsData,
      };
    case 'GET_COLUMNS_DATA_FAIL':
      return {
        ...state,
        loadingColumns: false,
      };
    case 'REORDER_CARDS_COLUMNS':
      return {
        ...state,
        columns: action.payload,
      };
    default: return state;
  }
};
