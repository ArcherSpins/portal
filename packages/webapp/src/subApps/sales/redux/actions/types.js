// @flow
// deals types
import type {
  DealType,
  ColumnType,
  EmployeeType,
  TypeDeal,
  DealTask,
} from '../../types';

export type PropsFilterDeals = {
  stageID?: string,
  managerID?: string,
  client?: string,
  title?: string,
  createdBefore?: string,
  createdAfter?: string,
  limit?: string | number,
  offset?: string | number
}

export type GetDealsSuccess = {
  type: 'GET_DEALS_SUCCESS',
  payload: {
    deals: Array<DealType>,
    columns: {
      [string]: ColumnType
    },
  }
}

export type getTypeTaskDeal = {
  type: 'GET_DEAL_TYPES_SUCCESS' |
        'GET_DEAL_TASKS_SUCCESS',
  payload: Array<TypeDeal> | Array<DealTask>
}

export type GetDealsType = {
  type: 'GET_DEALS_REQUEST' |
        'GET_DEALS_FAIL',
  payload?: {
    returnDeals?: (Array<DealType>) => void,
    props?: PropsFilterDeals
  },
} | GetDealsSuccess

export type UpdateDealType = {
  type: 'UPDATE_DEAL_REQUEST' |
        'UPDATE_DEAL_SUCCESS' |
        'UPDATE_DEAL_FAIL',
  payload?: DealType
}

export type UpdateDealReorderPayloadPropsType = {
  toggleModalShow: (boolean, string) => void,
  columns: {
    [string]: ColumnType,
  },
  element: HTMLElement,
}

export type UpdateDealReorderPayloadType = {
  data: DealType,
  props: UpdateDealReorderPayloadPropsType
}

export type UpdateDealReorderType = {
  type: 'UPDATE_DEAL_REORDER_REQUEST' |
        'UPDATE_DEAL_REORDER_SUCCESS' |
        'UPDATE_DEAL_REORDER_FAIL',
  payload: UpdateDealReorderPayloadType,
}

// statuses types

export type getColumnsSuccessType = {
  type: 'GET_COLUMNS_DATA_SUCCESS',
  payload: {
    columns: {
      [string]: ColumnType
    },
    columnOrder: Array<string>,
    columnsData: Array<ColumnType>
  }
}

export type reorderCards = {
  type: 'REORDER_CARDS_COLUMNS',
  payload: {
    columns: {
      [string]: ColumnType
    },
  }
}

export type getColumnsType = {
  type: 'GET_COLUMNS_DATA_REQUEST' |
        'GET_COLUMNS_DATA_FAIL',
} | getColumnsSuccessType | reorderCards


// employees types

export type getEmployeesPayloadType = {
  search: string,
  returnEmployees: (Array<EmployeeType>) => void
}

export type getEmployeesSuccess = {
  type: 'GET_EMPLOYEES_SUCCESS',
  payload: Array<EmployeeType>
}

export type getEmployeesRequest = {
  type: 'GET_EMPLOYEES_REQUEST',
  payload: getEmployeesPayloadType,
}

export type getEmployeesType = {
  type: 'GET_EMPLOYEES_FAIL',
} | getEmployeesSuccess | getEmployeesRequest
