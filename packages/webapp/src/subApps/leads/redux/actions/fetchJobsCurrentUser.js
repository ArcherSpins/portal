// @flow

export const fetchJobsForCurrentUser = (data: {
  from: Date,
  to: Date
}) => ({
  type: 'FETCH_JOBS_FOR_CURRENT_USER_REQUEST',
  payload: data,
});

export const fetchBlockingJobsCurrentUser = (data: {
  from: Date,
  to: Date
}) => ({
  type: 'FETCH_BLOCKING_JOBS_FOR_CURRENT_USER_REQUEST',
  payload: data,
});
