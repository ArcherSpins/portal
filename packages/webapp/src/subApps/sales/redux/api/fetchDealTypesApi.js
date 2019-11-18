// @flow
import type { FetchResult } from 'apollo-client';
import client from 'utils/api';
import type { TaskDeal } from '../../types';
import {
  getDealTasksType,
  getDealTaskTypeId,
  getDealTaskId,
  getDealTasks,
  updateDealTask,
} from '../../graphql/queries';

type Response = Array<TaskDeal> | TaskDeal

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
    console.log(result);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchDealTasks(data: { dealID: string }): Promise<FetchResult<Response>> {
  try {
    const result = await client.query({
      query: getDealTasks,
      variables: data,
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
      variables: data,
    });
    console.log(result);
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
      mutation: getDealTaskId,
      variables: data,
    });
    console.log(result);
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
    console.log(result);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}
