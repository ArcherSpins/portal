// @flow
import type { Dispatch as ReduxDispatch } from 'redux';

import type { ErrorAction } from '../error/error.flow-types';

export type Log = {
  id: string,
  comment: string,
  date: Date,
  spentTime: number,
  assignedUser: {
    id: string,
    name: string
  },
  task: {
    id: string,
    title: string,
    number: number
  },
  createdAt: Date
};

export type LogCreation = {
  id?: string,
  taskID?: string,
  date: Date,
  spentTime: string,
  comment: string
};

export type LogState = {
  logs: Array<Log>,
  loading: boolean
};

export type LogAction =
  | { type: "SET_LOG_LOADING" }
  | { type: "CREATE_LOG", payload: Log }
  | { type: "GET_ALL_LOGS", payload: Array<Log> }
  | { type: "DELETE_LOG_BY_MILESTONE", +payload: string }
  | { type: "EDIT_LOG", +payload: Log };

export type Dispatch = ReduxDispatch<LogAction | ErrorAction>;
