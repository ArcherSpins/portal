// @flow
import type { Dispatch as ReduxDispatch } from 'redux';
import type { DatabaseRecord } from '../basic-types';
import type { ErrorAction } from '../error/error.flow-types';

export type TaskStatus = {
  title: string
} & DatabaseRecord;

export type Task = {
  id: string,
  title: string,
  description: string,
  number: number,
  spentTime: number,
  assignedUser: {
    id: string,
    name: string
  },
  state: TaskStatus,
  milestone: {
    id: string,
    title: string,
    number: number
  },
  project: {
    id: string,
    title: string
  },
  createdAt: Date
};

export type TaskCreation = {
  id?: string,
  milestoneID?: string,
  stateID?: string,
  title: string,
  description: string,
  assignedUserID: string
};

export type TaskState = {
  tasks: Array<Task>,
  loading: boolean,
  statuses: Array<TaskStatus>
};

export type TaskAction =
  | { type: "SET_TASK_LOADING" }
  | { type: "DELETE_TASK", payload: string }
  | { type: "CREATE_TASK", payload: Task }
  | { type: "GET_TASKS", payload: Array<Task> }
  | { type: "EDIT_TASK", payload: Task }
  | { type: "GET_TASKS_STATUSES_SUCCESS", payload: Array<TaskStatus> }
// | { type: "DELETE_TASK_BY_MILESTONE", payload: string };

export type Dispatch = ReduxDispatch<TaskAction | ErrorAction>;
