// @flow
import type { JobsCurrentUserType } from '../../types/api';

export const fetchJobsForCurrentUser = (data: {
  from: string,
  to: string
}) => ({
  type: 'FETCH_JOBS_FOR_CURRENT_USER_REQUEST',
  payload: data,
});


export const fetchJobsForCurrentUserSuccess = (data: JobsCurrentUserType) => ({
  type: 'FETCH_JOBS_FOR_CURRENT_USER_SUCCESS',
  payload: data,
});


export const fetchBlockingJobsCurrentUser = (data: {
  from: string,
  to: string
}) => ({
  type: 'FETCH_BLOCKING_JOBS_FOR_CURRENT_USER_REQUEST',
  payload: data,
});

export const fetchBlockingJobsCurrentUserSuccess = (data: JobsCurrentUserType) => ({
  type: 'FETCH_BLOCKING_JOBS_FOR_CURRENT_USER_SUCCESS',
  payload: data,
});
