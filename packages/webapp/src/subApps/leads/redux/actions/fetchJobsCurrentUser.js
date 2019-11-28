// @flow

export const fetchJobForCurrentUser = (data: {
  from: Date,
  to: Date
}) => ({
  type: 'FETCH_JOB_FOR_CURRENT_USER_REQUEST',
  payload: data,
});

export const fetchBlockingJobsCurrentUser = (data: {
  from: Date,
  to: Date
}) => ({
  type: 'FETCH_BLOCKING_JOB_FOR_CURRENT_USER_REQUEST',
  payload: data,
});
