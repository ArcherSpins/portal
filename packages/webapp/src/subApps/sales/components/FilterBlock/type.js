// @flow
import type {
  StatusType,
  ManagerType,
  CalendarType,
} from '../../types';


export type FilterBlockProps = {
  date: Date,
  endDate: Date,
  getCalendarData: (string, returnFunc?: (Array<CalendarType>) => void) => void,
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
