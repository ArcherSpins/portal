// @flow
import type { Dispatch as ReduxDispatch } from 'redux';
import type { ErrorAction } from '../error/error.flow-types';

export type Milestone = {
  id: string,
  title: string,
  description: string,
  estimatedTime: number,
  spentTime: number,
  number: number,
  project: {
    id: string,
    title: string,
    URL: string
  },
  state: {
    id: string,
    title: string
  },
  taskCreators: Array<{
    id: string,
    firstName: string,
    lastName: string,
    name: string
  }>,
  participants: Array<{
    id: string,
    firstName: string,
    lastName: string,
    name: string
  }>
};

export type MilestoneCreation = {
  id?: string,
  title: string,
  description: string,
  estTime: string,
  stateID?: string,
  projectID?: string,
  unbindTaskCreators?: Array<string>,
  bindTaskCreators?: Array<string>,
  unbindParticipants?: Array<string>,
  bindParticipants?: Array<string>
};

export type MilestoneState = {
  milestones: Array<Milestone>,
  loading: boolean
};

export type MilestoneAction =
  | { type: "SET_MILESTONE_LOADING" }
  | { type: "GET_ALL_MILESTONES", payload: Array<Milestone> }
  | { type: "CREATE_MILESTONE", payload: Milestone }
  | { type: "EDIT_MILESTONE", payload: Milestone }
  | { type: "DELETE_MILESTONE", payload: string };

export type Dispatch = ReduxDispatch<MilestoneAction | ErrorAction>;
