/* eslint-disable no-tabs */
// @flow

export type Props = {
  fetchJobsForCurrentUserAction: ({
		from: string,
		to: string
	}) => void,
	jobsForCurrentUser: ({
		from: string,
		to: string
	}) => void
}
