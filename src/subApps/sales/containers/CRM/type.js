// @flow
import type { DealType } from '../../types/deal';
import type { ColumnType, EmployeeType } from '../../types';
import type {
  UpdateDealReorderPayloadPropsType,
  getEmployeesPayloadType,
} from '../../redux/actions/types';

export type CRMContainerState = {
  crmCardData: {
    title: null | string,
    client: null | string,
    idSm: null | string,
  },
  tabStatus: boolean,
  searchValue: string,
  redirect: boolean,
  managers: Array<EmployeeType>,
  columnId: string,
  modalInfo: {
    show: boolean,
    message: string,
  },
}

export type CRMContainerProps = {
  dealsData: DealType,
  columnOrder: Array<mixed>,
  columns: {
    [string]: ColumnType
  },
  createCrmCard: boolean,
  loaded: boolean,
  errorsFormCreate: mixed,
  reorderCards: (mixed) => {},
  getColumnsAction: (mixed) => Array<mixed>,
  loadedData: (boolean) => {},
  setErrorForm: (string | number, string) => {},
  deleteErrorForm: (string | number) => {},
  getEmployees: {
    refetch: () => Array<mixed>,
    loading: boolean
  },
  createDeal: {
    loading: boolean
  },

  getDealsAction: (null, null, columnsState: { [string]: DealType }) => void,
  getColumnsDataAction: (
    (columnData: Array<ColumnType>, columnsState: { [string]: DealType }) => void
  ) => void,
  columnData: Array<ColumnType>,
  loadingColumns: boolean,
  loadingDeals: boolean,
  updateDealReorderAction: (
    data: { id: string, stageId: string }, props: UpdateDealReorderPayloadPropsType
  ) => void,
  getEmployeesAction: (data: getEmployeesPayloadType) => void
}
