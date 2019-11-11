// @flow
import type {
  StatusType,
  ManagerType,
} from '../../types';


export type FilterBlockProps = {
  date: string,
  endDate: string,
  // changeDate: (string) => void,
  changeFilter: (string | number, {
    label: string,
      value: string,
      id: string
  }) => void,
  onSubmitFilter: (any, any) => void,
  filterObject: {
    status: null | {
      label: string,
      value: string,
      id: string
    },
    manager: null | {
      label: string,
      value: string,
      id: string
    },
    client: string | null,
    end: any,
    start: any,
    deal: null | string
  },
  statuses: Array<StatusType>,
  managers: Array<ManagerType>,
  idManager: string | number,
  idStatus: string | number,
}
