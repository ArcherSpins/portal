// @flow
import type {
  SourceType,
  ChannelType,
  StatusType,
  ManagerType,
  DealType,
} from '../../types';
import type { State } from '../../containers/DetailsList/type';

export type PropsType = {
  edit: boolean,
  activateFormEdit: (mixed, mixed) => {},
  editForm: {
    contact: boolean,
    source: boolean,
    client: boolean,
    propSource: boolean
  },
  activeUser: DealType,
  statuses: Array<StatusType>,
  channels: Array<ChannelType>,
  sources: Array<SourceType>,
  managers: Array<ManagerType>,
  errorsFormCreate: {
    [string]: {
      error: boolean,
      message: string,
    }
  },
  showModalErrorMessage: boolean,
  toggleShowModal: (boolean) => void
}

export type DetailsListProps = {
  props: PropsType,
  state: State,
  changeInput: (string, any, any, any) => void | any,
  newContact: () => void | any,
  editImage: (any, number | string, string, number) => void,
  closeEdit: (SyntheticEvent<HTMLButtonElement>) => void,
  onSubmitEdit: (SyntheticEvent<HTMLFormElement>) => void,
  deleteContact: (any, number) => {},
  setSourceData: (SourceType) => {} | void,
}
