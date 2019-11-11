/* eslint-disable react/no-unused-state */
// @flow
import type {
  StatusType,
  DealType,
  ColumnType,
} from '../../types';


export type CRMType = {
  statuses: Array<StatusType>,
  crm: DealType,
  columns: {
    [string]: ColumnType
  },
  createCrmCard: boolean,
  columnOrder: {
    [string]: mixed
  },
  loaded: boolean,
  deals?: Array<DealType>,
  loadingDeals?: boolean,
  activeDeal?: DealType,
  loadingById?: boolean
}

export default {
  statuses: [],
  crm: {
  },
  columns: {
    '9b102320-e353-4a1d-a076-fba7b38f2bf0': {
      id: '9b102320-e353-4a1d-a076-fba7b38f2bf0',
      title: 'lead',
      index: 10,
      taskIds: [],
    },
    introduction: {
      id: 'introduction',
      title: 'introduction',
      index: 20,
      taskIds: [],
    },
    estimation: {
      id: 'estimation',
      title: 'Estimation',
      index: 30,
      taskIds: [],
    },
    negotiation: {
      id: 'negotiation',
      title: 'Negotiation',
      index: 40,
      taskIds: [],
    },
  },
  createCrmCard: false,
  columnOrder: {},
  loaded: false,
};
