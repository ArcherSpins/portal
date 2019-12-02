// @flow
import type { FetchResult } from 'apollo-link';
import client from 'utils/api';
import {
  getJobsForCurrentUser,
  getBlockingJobsCurrentUser,
  createBlockingJobsForCurrentUser,
} from '../../graphql/queries';
import type { JobsCurrentUserType } from '../../types/api';

type Response = Array<JobsCurrentUserType>;

export async function fetchJobsForCurrentUser(data: {
    from: Date,
    to: Date
}): Promise<FetchResult<Response>> {
  try {
    const response = await client.query({
      query: getJobsForCurrentUser,
      variables: data,
    });
    return response.data.jobsForCurrentUser;
  } catch (err) {
    throw new Error(err.message);
  }
}


export async function fetchBlockingJobsCurrentUser(data: {
  from: Date,
  to: Date
}): Promise<FetchResult<Response>> {
  try {
    const response = await client.query({
      query: getBlockingJobsCurrentUser,
      variables: data,
    });
    return response.data.blockingJobsCurrentUser;
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
