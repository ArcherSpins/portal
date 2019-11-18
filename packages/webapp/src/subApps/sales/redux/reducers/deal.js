// @flow
import type {
  GetDealsType,
  UpdateDealType,
  getTypeTaskDeal,
} from '../actions/types';
import initial, { type CRMType } from './initialStateCrm';

const initialState: CRMType = initial;

export default (
  state: CRMType = initialState,
  action: GetDealsType | UpdateDealType | getTypeTaskDeal,
): CRMType => {
  switch (action.type) {
    case 'GET_DEALS_REQUEST':
      return {
        ...state,
        loadingDeals: true,
      };
    case 'GET_DEALS_SUCCESS':
      return {
        ...state,
        loadingDeals: false,
        deals: action.payload.deals,
        columns: action.payload.columns,
      };
    case 'GET_DEALS_FAIL':
      return {
        ...state,
        loadingDeals: false,
      };
    case 'UPDATE_DEAL_REQUEST':
      return {
        ...state,
        loadingById: true,
      };
    case 'UPDATE_DEAL_SUCCESS':
      return {
        ...state,
        loadingById: false,
        activeDeal: action.payload,
      };
    case 'UPDATE_DEAL_FAIL':
      return {
        ...state,
        loadingById: false,
      };
    case 'GET_DEAL_TYPES_SUCCESS':
      return {
        ...state,
        dealTypes: action.payload,
      };
    case 'GET_DEAL_TASKS_SUCCESS':
      return {
        ...state,
        dealTasks: action.payload,
      };
    default: return state;
  }
};
