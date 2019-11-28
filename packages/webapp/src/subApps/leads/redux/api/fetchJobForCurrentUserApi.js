// @flow
// import type { FetchResult } from 'apollo-link';
import client from 'utils/api';
import {
  getJobForCurrentUser,
  getBlockingJobsCurrentUser,
  createBlockingJobsForCurrentUser,
} from '../../graphql/queries';

export async function fetchJobForCurrentUser(data: {
    from: Date,
    to: Date
}): Promise<void> {
  try {
    const response = await client.query({
      query: getJobForCurrentUser,
      variables: data,
    });
    console.log(response);
    return response.data.calendar;
  } catch (err) {
    throw new Error(err.message);
  }
}


export async function fetchBlockingJobsCurrentUser(data: {
  from: Date,
  to: Date
}): Promise<void> {
  try {
    const response = await client.query({
      query: getBlockingJobsCurrentUser,
      variables: data,
    });
    return response.data.calendar;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchCreateBlockingJobsCurrentUser(data: {
  from: string,
  to: string,
  tags: Array<string>
}): Promise<void> {
  try {
    const response = await client.mutate({
      mutation: createBlockingJobsForCurrentUser,
      variables: data,
    });
    return response.data.calendar;
  } catch (err) {
    throw new Error(err.message);
  }
}
