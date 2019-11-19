// @flow
import type { Match, RouterHistory } from 'react-router-dom';
import type {
  ParameterType,
  ChannelType,
  SourceType,
  DealType,
  ContactType,
  ManagerType,
  CommentType,
  StatusType,
  DealTask,
  TypeDeal,
  CalendarType,
} from '../../types';
import type {
  PropsFilterDeals,
} from '../../redux/actions/types';
import type { CreateDealType } from '../../redux/sagas/types';

export type State = {
  title: string,
  error: boolean,
  edit: boolean,
  modalApproval: boolean,
  redirectDeleteDeal: boolean,
  dataDealForDelete: any,
  isNewDeal: boolean,
  editForm: {
    client: boolean,
    sales: boolean,
    contact: boolean,
    channel: boolean,
    source: boolean,
    status: boolean,
    propSource: boolean,
  },
  parameters: Array<ParameterType>,
  editTitle: boolean,
  titleText: string,
  redirectNewDeal: {
    redirect: boolean,
    url: string,
  },
  showModalErrorMessage: boolean,
}

export type PropsCrmDetails = {
  errorsFormCreate: {
    [string]: {
      error: boolean,
      message: string
    },
  },
  match: Match,
  getCalendarData: (string, returnFunc?: (Array<CalendarType>) => void) => void,
  dealTasks: Array<DealTask>,
  dealTypes: Array<TypeDeal>,
  history: RouterHistory,
  comments: Array<CommentType>,
  contacts: Array<ContactType>,
  statuses: Array<StatusType>,
  channels: Array<ChannelType>,
  sources: Array<SourceType>,
  managers: Array<ManagerType>,
  activeManager: ManagerType,
  activeUser: DealType,
  loadingEmployees: boolean,
  fetchUpdateDealTask: ({
    id: string,
    resolveComment: string
  }) => void,
  fetchCreateDealTask: ({
    dealID: string,
    typeID: string,
    description: string,
  }) => void,
  loadingColumns: boolean,
  loadingComments: boolean,
  loadingDeals: boolean,
  loadingChannels: boolean,
  loadingById: boolean,
  loadingSources: boolean,
  fetchDealTypeIdRequest: (string) => void,
  fetchDealTypesRequest: () => void,
  fetchDealTasksRequest: (string) => void,
  errorAlert: {
    status: boolean,
    message: string
  },
  fetchDeleteCommentAction: (string) => void,
  fetchCreateContactAction: (
    payload: {
      dealId: string,
      parameterId: string,
      value: string,
    },
    contacts: Array<ContactType>
  ) => void,
  fetchCreateDealAction: (
    data: CreateDealType,
    returnCreated?: (DealType) => void
  ) => void,
  closeErrorAlert: () => void,
  fetchCommentsAction: (id: string, returnData?: (Array<CommentType>) => void) => void,
  fetchDealParametersAction: (
    returnParameters?: (Array<ParameterType>) => void
  ) => void,
  getEmployeesAction: (any, func?: (data: Array<ManagerType>) => void) => void,
  setContactsDeal: (Array<ContactType>) => void,
  fetchSelfInfoAction: (
    func?: (ManagerType) => void
  ) => void,
  setActiveManagerAction: (manager: ManagerType) => void,
  getColumnsDataAction: () => void,
  getDealsAction: (returnDeals: (Array<DealType>) => void, props?: PropsFilterDeals) => void,
  setErrorForm: (string, message?: string) => void,
  deleteErrorForm: (string) => void,
  editTask: (string, any) => void,
  fetchChannelsAction: (returnChannels?: (Array<ChannelType>) => void) => void,
  fetchSourcesAction: (returnSource?: (Array<SourceType>) => void) => void,
  setActiveUser: (DealType) => void,
  getCommentsAction: (id: string, returnData?: (Array<CommentType>) => void) => void,
  startCreateNewDeal: () => void,
  fetchDeleteContactAction: (id: string, returnData?: (Array<ContactType>) => void) => void,
  fetchUpdateDealAction: (data: DealType, returnData?: (DealType) => void) => void,
  fetchCreateCommentAction: (
    data: {
      dealId: string,
      content: string
    },
    returnComment?: (CommentType) => void
  ) => void,
  setCommentAction: (CommentType) => void,
  fetchUpdateCommentAction: ({ id: string, content: string }) => void,
  fetchUpdateContactAction: ({ id: string, value: string }) => void,
  fetchDeleteDealAction: (data: { id: string }) => void,
  getDealById: {
    refetch: ({
      id: string
    }) => DealType
  },
  getDealComments: {
    refetch: ({
      dealId: string
    }) => Array<mixed>,
    loading: boolean
  },
  updateDealComment: ({
    id: string,
    content: string
  }),
  deleteDeal: ({
    id: string
  }) => mixed,
};
