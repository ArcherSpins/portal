// @flow
import type { FetchResult } from 'apollo-client';
import client from 'utils/api';
import type { TaskDeal } from '../../types';
import {
  getDealTasksType,
  getDealTaskTypeId,
  getDealTaskId,
  getDealTasks,
  createDealTask,
  updateDealTask,
  getDealLogs,
} from '../../graphql/queries';

type Response = Array<TaskDeal> | TaskDeal

export async function fetchDealLogs(data: { dealID: string }): Promise<void> {
  try {
    const result = await client.query({
      query: getDealLogs,
      variables: {
        limit: '35',
        offset: '0',
        ...data,
      },
      fetchPolicy: 'no-cache',
    });
    return result.data.dealLogs;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchDealTypes(): Promise<FetchResult<Response>> {
  try {
    const result = await client.query({
      query: getDealTasksType,
    });

    return result.data.dealTaskTypes;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchDealTypeId(data: { id: string }): Promise<FetchResult<Response>> {
  try {
    const result = await client.query({
      query: getDealTaskTypeId,
      variables: data,
    });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchDealTasks(data: { dealID: string }): Promise<FetchResult<Response>> {
  try {
    const result = await client.query({
      query: getDealTasks,
      variables: {
        limit: '25',
        ...data,
      },
      fetchPolicy: 'no-cache',
    });

    return result.data.dealTasks;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchDealTaskId(data: { id: string }): Promise<FetchResult<Response>> {
  try {
    const result = await client.query({
      query: getDealTaskId,
      variables: {
        limit: '25',
        ...data,
      },
      fetchPolicy: 'no-cache',
    });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchCreateDealTask(data: {
  dealID: string,
  typeID: string,
  description: string,
}): Promise<void> {
  try {
    const result = await client.mutate({
      mutation: createDealTask,
      variables: data,
    });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchUpdateDealTask(data: {
  id: string,
  resolveComment: string
}): Promise<void> {
  try {
    const result = await client.mutate({
      mutation: updateDealTask,
      variables: data,
    });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}
