// @flow
import type { Dispatch as ReduxDispatch } from 'redux';

import type { ErrorAction } from '../error/error.flow-types';

export type Project = {
  id: string,
  title: string,
  description: string,
  URL: string,
  createdAt: Date,
  type: {
    id: string,
    title: string
  },
  engagementModel: {
    id: string,
    title: string
  },
  manager: {
    id: string,
    firstName: string,
    lastName: string
  },
  participants: Array<{
    id: string,
    firstName: string,
    lastName: string,
    name: string
  }>,
  watchers: Array<{
    id: string,
    firstName: string,
    lastName: string,
    name: string
  }>,
  spentTime: number,
  estimatedTime: number
};

export type ProjectCreation = {
  id?: string,
  title: string,
  URL: string,
  description: string,
  managerID: string,
  engagementModel: string,
  type: string,
  watchers?: Array<string>,
  participants?: Array<string>,
  unbindWatchers?: Array<string>,
  bindWatchers?: Array<string>,
  unbindParticipants?: Array<string>,
  bindParticipants?: Array<string>
};

export type ProjectState = {
  projects: Array<Project>,
  loading: boolean
};

export type ProjectAction =
  | { type: "SAVE_PROJECT", +payload: Project }
  | { type: "EDIT_PROJECT", +payload: Project }
  | { type: "GET_ALL_PROJECTS", +payload: Array<Project> }
  | { type: "SET_PROJECT_LOADING" };

export type Dispatch = ReduxDispatch<ProjectAction | ErrorAction>;
