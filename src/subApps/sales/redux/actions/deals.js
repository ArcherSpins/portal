// @flow
import type { UpdateDealType } from '../sagas/types';
import type {
  GetDealsType,
  UpdateDealReorderPayloadPropsType,
  PropsFilterDeals,
} from './types';
import type { DealType, ColumnType } from '../../types';

export const getDealsAction = (
  returnDeals?: (Array<DealType>) => void,
  props?: PropsFilterDeals,
  columns?: Array<ColumnType>,
): GetDealsType => ({
  type: 'GET_DEALS_REQUEST',
  payload: {
    columns,
    returnDeals,
    props,
  },
});

export const getDealById = (
  id: string,
  returnDeal?: (DealType) => void,
) => ({
  type: 'GET_DEAL_BY_ID_REQUEST',
  payload: {
    id, returnDeal,
  },
});

export const updateDealReorderAction = (
  data: UpdateDealType, props: UpdateDealReorderPayloadPropsType,
) => ({
  type: 'UPDATE_DEAL_REORDER_REQUEST',
  payload: {
    data,
    props,
  },
});
