// @flow
import type {
  ManagerType,
  DealType,
  StatusesType,
  ContactType,
  CommentType,
  ChannelType,
  SourceType,
} from '../../types';
import type { CreateDealType } from '../sagas/types';

export const setActiveUser = (user: DealType) => ({
  type: 'SET_USER',
  payload: user,
});

export const deleteCommentAction = (id: string) => ({
  type: 'DELETE_COMMENT_SUCCESS',
  payload: id,
});

export const updateCommentAction = (id: string, newComment: string) => ({
  type: 'UPDATE_COMMENT_SUCCESS',
  payload: {
    id,
    newComment,
  },
});

export const setActiveManagerAction = (manager: ManagerType) => ({
  type: 'SET_ACTIVE_MANAGER',
  payload: manager,
});


export const deleteContactAction = (id: string) => ({
  type: 'DELETE_CONTACT_SUCCESS',
  payload: id,
});

export const setContactsDeal = (contacts: Array<ContactType>) => ({
  type: 'SET_CONTACTS',
  payload: contacts,
});

export const getChannelsAction = (channels: Array<ChannelType>) => ({
  type: 'GET_CHANNELS_SUCCESS',
  payload: channels,
});

export const getCommentsAction = (comments: Array<CommentType>) => ({
  type: 'GET_COMMENTS_SUCCESS',
  payload: comments,
});

export const getSourcesAction = (statuses: Array<StatusesType>) => ({
  type: 'GET_SOURCES_SUCCESS',
  payload: statuses,
});

export const setCommentAction = (comment: CommentType) => ({
  type: 'CREATE_COMMENT_SUCCESS',
  payload: comment,
});
// fix actions
export const fetchDeleteDealAction = (deleteDeal: { id: string }) => ({
  type: 'DELETE_DEAL_REQUEST',
  payload: deleteDeal,
});

export const fetchDeleteCommentAction = (id: string) => ({
  type: 'DELETE_COMMENT_REQUEST',
  payload: id,
});

export const fetchUpdateCommentAction = (obj: { id: string, content: string }) => ({
  type: 'UPDATE_COMMENT_REQUEST',
  payload: obj,
});

export const fetchUpdateContactAction = (data: { id: string, value: string }) => ({
  type: 'UPDATE_CONTACT_REQUEST',
  payload: data,
});

export const fetchCreateContactAction = (
  data: {
    dealId: string,
    parameterId: string,
    value: string,
  },
  contacts: Array<ContactType>,
) => ({
  type: 'CREATE_CONTACT_REQUEST',
  payload: data,
  contacts,
});

export const fetchCreateCommentAction = (
  data: {
    dealId: string,
    content: string
  },
  returnComment?: (CommentType) => void,
) => ({
  type: 'CREATE_COMMENT_REQUEST',
  payload: {
    data,
    returnComment,
  },
});

export const fetchCreateDealAction = (
  data: CreateDealType,
  returnCreated?: (DealType) => void,
) => ({
  type: 'CREATE_DEAL_REQUEST',
  payload: {
    data,
    returnCreated,
  },
});

export const fetchUpdateDealAction = (
  data: DealType,
  returnUpdated?: (deal: DealType) => void,
) => ({
  type: 'UPDATE_DEAL_REQUEST',
  payload: {
    data,
    returnUpdated,
  },
});

export const fetchDeleteContactAction = (
  id: string,
  returnContacts?: (Array<ContactType>) => void,
) => ({
  type: 'DELETE_CONTACT_REQUEST',
  payload: {
    id,
    returnContacts,
  },
});

export const fetchDealParametersAction = (
  returnParameters?: () => void,
) => ({
  type: 'GET_DEAL_PARAMETERS_REQUEST',
  payload: returnParameters,
});

export const fetchCommentsAction = (
  id: string,
  returnComments?: (Array<CommentType>) => void,
) => ({
  type: 'GET_COMMENTS_REQUEST',
  payload: {
    idDeal: id,
    returnComments,
  },
});

export const fetchSourcesAction = (returnSources?: (Array<SourceType>) => void) => ({
  type: 'GET_SOURCES_REQUEST',
  payload: returnSources,
});

export const fetchChannelsAction = (returnChannels?: (Array<ChannelType>) => void) => ({
  type: 'GET_CHANNELS_REQUEST',
  payload: returnChannels,
});

export const fetchSelfInfoAction = (returnInfo: (ManagerType) => void) => ({
  type: 'GET_SELF_INFO_REQUEST',
  payload: returnInfo,
});
