// @flow

import client from 'utils/api';
import { GET_TASK_STATUSES } from '../../graphql/queries/task.queries';

import type { TaskStatus } from './task.flow-types';

type Response = {
  taskStates: Array<TaskStatus>,
};

// eslint-disable-next-line import/prefer-default-export
export async function fetchTaskStatuses(): Promise<Response> {
  const response = await client.query({
    query: GET_TASK_STATUSES,
  });
  return response.data.taskStates;
}
