// @flow

import type {
  DealType,
  ColumnType,
  StatusType,
  EmployeeType,
  ManagerType,
} from '../../types';

export type ColumnsArrayType = Array<ColumnType>;
export type EmployeesArrayType = Array<EmployeeType>;

export type SearchDealContainerState = {
  searchValue: string,
  dataDeals: Array<DealType>,
  search: boolean,
  data: Array<{[string]: DealType}>,
  filterDeals: Array<DealType>,
  filterObject: {
    deal: string,
    client: string,
    status: StatusType | null,
    manager: ManagerType | null,
    start: Date | string | null,
    end: Date | string | null,
  },
  managers: Array<ManagerType>,
}

export type SearchDealContainerProps = {
  getColumnsDataAction: ((ColumnsArrayType) => void) => void,
  getDealsAction: (
    (Array<DealType>) => void,
    any,
  ) => void,
  loadingDeals: boolean,
  getEmployeesAction: (
    search: string,
    returnEmployees: (EmployeesArrayType) => void
  ) => void,
  loadingColumns: boolean,
  cards: {[string]: DealType},
  match: {
    params: {
      search: string | null,
    },
  },
}
